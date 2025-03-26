import {test as base} from '@playwright/test'

// use this file when you want to use other environment variables 
// different than baseURL in playwright.config.ts
export type TestOptions = 
{
    customEnvironmentVariable: string
}

export const test = base.extend<TestOptions>({
    customEnvironmentVariable: ['', {option: true}]
})