import {EvaService} from 'eva.io-core';

exports.config = {

    // Хост для WebDriver сервера
    hostname: process.env.CI ? "" + 'hub.harlequin.v2.dev2.k8s.tcsbank.ru' : 'localhost',
    port: 80,
    path: process.env.CI === 'true' ? '/wd/hub' : '/',
    runner: 'local',
    protocol: 'http',
    specs: ['./tests/**/*.ts'],
    chromeDriverArgs: ['--silent'],
    maxInstances: 1,
    capabilities: [{

        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 1,
        //
        'selenoid:options': {
            // креды зашиты в образе в ci
            username: process.env.SELENOID_LOGIN,
            password: process.env.SELENOID_PASSWORD,
            name: `Eva.io education`,
            enableVideo: false,
            sessionTimeout: '5m',
        },
        'goog:chromeOptions': {
            args: [
                '--incognito',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--window-size=1920,1080',
                '--remote-debugging-port=9222',
                '--disable-infobars=true',
                '--safebrowsing-disable-download-protection',
                '--disable-impl-side-painting',
                '--disable-gpu',
                '--ignore-certificate-errors',
                '--disable-web-security',
            ],
        },
        //
        browserName: 'chrome',
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
    logLevel: 'error',
    baseUrl: 'https://cats-ui-eva.tcsbank.ru/',
    waitforTimeout: 0,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: [[EvaService, {loglevel: 'info'}], process.env.CI ? [[{name: 'stub'}]] : ['chromedriver']],
    framework: 'mocha',
    reporters: [
        [
            'allure',
            {
                disableMochaHooks: true,
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true,
            },
        ],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 6000000,
    },
};
