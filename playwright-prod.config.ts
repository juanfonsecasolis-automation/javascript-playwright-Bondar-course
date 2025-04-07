import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

import * as dotenv from 'dotenv'
dotenv.config();

export default defineConfig<TestOptions>({

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, 
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',  
  
  /* Runtime settings */
  use: {
    baseURL: '/',
    customEnvironmentVariable: 'anyURL',  // created on test-options.ts
    trace: 'on',
    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
  },

  /**
   * Project specific settings
   */
  projects: [
    { name: 'setup', testMatch: 'auth.setup.ts' }, 
    {
      name: 'prod-apis',
      testMatch: 'workingWithApis.spec.ts',
      use: { 
        browserName: 'chromium', 
        storageState: './.auth/user.json',
        baseURL: 'http://localhost:4200'
      },
      dependencies: ['setup'], // run 'setup' project first
    }
  ]
});
