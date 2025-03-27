/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test as setup, expect} from '@playwright/test'

setup('delete a created article', async({request}) => {

    // delete the article via the API
    const articleSlug = process.env.SLUGID
    const deleteArticleResponse = await request.delete(
        `https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`)
    expect(await deleteArticleResponse.status()).toEqual(204)
})