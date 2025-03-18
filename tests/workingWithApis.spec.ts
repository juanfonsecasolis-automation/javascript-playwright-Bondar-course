/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect, request } from '@playwright/test'; // external import

var accessToken; // function scope (vs. block scope)

test.beforeEach(async ({page, request}) => {
    // log in using the UI
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name:"Email"}).fill("juantests@test.com")
    await page.getByRole('textbox', {name:"Password"}).fill("TestingSince2013!")
    await page.getByRole('button', {name:"Sign in"}).click()

    // log in using the API
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": "juantests@test.com", "password": "TestingSince2013!"}
        }
    })
    const responseBody = await response.json()
    accessToken = responseBody.user.token
})

test('create an article using the API and delete it using the UI', async ({page, request}) => {

    // create the article using the API
    const articleTitle = "Brand new article";
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article":{
                "title": articleTitle,
                "description":"Article created from a Playwright script.",
                "body":"This is a description.",
                "tagList":["Playwright", "Test"]}
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })
    expect(articleResponse.status()).toEqual(201)

    // delete the article using the UI
    await page.getByText('Global Feed').click()
    await page.getByText(articleTitle).click()
    await page.getByRole('button', {name:"Delete Article"}).first().click()
    await expect(page.locator('app-article-list h1').first()).not.toContainText(articleTitle)
})

test('create an article using the UI and delete it using the API', async ({page, request}) => { 
    
    const articleName = 'Playwright is awesome!'

    // create the article using the UI
    await page.getByText('New Article').click()
    await page.getByRole('textbox', {name: 'Article Title'}).fill(articleName)
    await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('About Playwright.')
    await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('We would like to use Playwright for automation.')
    await page.getByRole('button', {name: 'Publish Article'}).click()
    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await articleResponse.json()
    const articleSlug = await articleResponseBody.article.slug
    await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome!')

    // go back to the global feed 
    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list h1').first()).toContainText(articleName)

    // delete the article via the API
    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`,
        {
            headers: {
            Authorization: `Token ${accessToken}`
        }
    })
    expect(await deleteArticleResponse.status()).toEqual(204)
})

