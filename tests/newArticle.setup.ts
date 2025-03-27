/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test as setup, expect} from '@playwright/test'

setup('create new article', async({request}) => {

    // create the article using the API
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article":{
                "title": 'Article to test the Likes button',
                "description":"Article created from a Playwright script.",
                "body":"This is a description.",
                "tagList":["Playwright", "Test"]}
        }
    })
    expect(articleResponse.status()).toEqual(201)

    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
})