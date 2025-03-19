/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test as setup } from '@playwright/test';
import fs from 'fs'
import { createRequire } from 'node:module'

setup('authentication', async ({request}) => {

    // read the content of the user.json file, this is a workaround for 
    // the error received when using the stamente below
    // import user from '../.auth/user.json' assert { type: "json" };
    const authFile = '.auth/user.json'
    const require = createRequire(import.meta.url)
    const user = require('../.auth/user.json')

    // log in using the API
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": "juantests@test.com", "password": "~~!asdf@#$1321%^&*(~"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCESS_TOKEN'] = accessToken   // also applied change to global 'use' in playwright.config.ts so all API calls include this token in headers

    // Save authentication state and share it across tests.
    // This refactor required to modify playwright.config.ts to add a new project,
    // and modify the existent browser's projects in that same file.
    // await page.context().storageState({path: authFile})
})

