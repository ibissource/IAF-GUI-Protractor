const JasmineConsoleReporter = require('jasmine-console-reporter');

exports.config = {
    framework: 'jasmine2',
    baseUrl: 'https://frank2example.frankframework.org/iaf/gui',
    directConnect: true,

    capabilities: {
        browserName: 'chrome',
        chromeOptions:{
            args:[
                "--headless",
                "--disable-gpu",
                "--window-size=1920,1080",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-extensions",
            ]
        }
    },
    specs: ['*.spec.js'],

    allScriptsTimeout: 120000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000000
    },    
    onPrepare: function(){
        jasmine.getEnv().addReporter(new JasmineConsoleReporter({
            emoji: true 
        }));
        jasmine.getEnv().defaultTimeoutInterval = 120000;
        browser.get('#!/status');
    }
}