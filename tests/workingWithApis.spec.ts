/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect } from '@playwright/test'; // external import
import { createRequire } from 'node:module'
import tags from '../test-data/tags.json' with { type: "json" }

test.beforeEach(async ({page, request}) => {
    await page.goto('https://conduit.bondaracademy.com/')
})

test('mock API response and verify title in UI', async ({page}) => {

    // configure the mock for tags
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        }) 
    })

    // configure the mock for tags
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch() // complete the API call and return the response
        const responseBody = await response.json()
        responseBody['articles'][0].title = 'This is a test title.'
        responseBody['articles'][0].description = 'This is a test description.'
        await route.fulfill({
            body: JSON.stringify(responseBody)
        }) 
    })

    // perform the verification
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a test title.')
    await expect(page.locator('app-article-list p').first()).toContainText('This is a test description.')
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
    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`)
    expect(await deleteArticleResponse.status()).toEqual(204)
})

