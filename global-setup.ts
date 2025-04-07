/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {expect, request} from '@playwright/test'
import fs from 'fs'
import user from './.auth/user.json' assert { type: "json" }

async function globalSetup()
{
    const context = await request.newContext();

    const email = process.env.CONDUIT_EMAIL
    const password = process.env.CONDUIT_PASSWORD

    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": email, "password": password}
        }
    })
    const responseBody = await responseToken.json()
    await expect(responseToken.status()).toBe(200);

    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync('./.auth/user.json', JSON.stringify(user))
    process.env['ACCESS_TOKEN'] = accessToken  

    // create the article using the API
    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article":{
                "title": `Global Likes test article ${Date.now()}`,
                "description":"Article created from a Playwright script.",
                "body":"This is a description.",
                "tagList":["Playwright", "Test"]}
        },
        headers:    // no extraHttpHeaders access
        {
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    })
    expect(articleResponse.status()).toEqual(201)

    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup