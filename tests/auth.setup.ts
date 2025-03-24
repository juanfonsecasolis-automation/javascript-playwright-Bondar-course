/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { expect, test as setup } from '@playwright/test';
import fs from 'fs'
import { createRequire } from 'node:module'

setup('authentication', async ({request}) => {

    // read the content of the user.json file, this is a workaround for 
    // the error received when using the stamente below
    // import user from '../.auth/user.json' assert { type: "json" };
    const authFile = '.auth/user.json'
    const require = createRequire(import.meta.url)
    const user = require('../.auth/user.json')

    // log in using the API and save the token in the .auth/user.json file
    const email = process.env.CONDUIT_EMAIL
    const password = process.env.CONDUIT_PASSWORD
    
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": email, "password": password}
        }
    })
    const responseBody = await response.json()
    await expect(response.status()).toBe(200);

    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    // in the above block the token is stored in the .auth/user.json file above, but the token
    // is actually used by the test until playwright sets the property use.extraHTTPHeaders 
    // (on playwright.config.ts file) to an authorization header that uses the environment 
    // variable below; that header is injected to all API requests.
    process.env['ACCESS_TOKEN'] = accessToken   

    // Here is another method suggested by Artam:
    // Save authentication state and share it across tests.
    // This refactor required to modify playwright.config.ts to add a new project,
    // and modify the existent browser's projects in that same file.
    // await page.context().storageState({path: authFile})
})

