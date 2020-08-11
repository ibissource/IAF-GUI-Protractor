const CookieBar = require('./components/cookiebar.component');
const TestPipelinePage = require('./pages/test-pipeline.page');

describe('Test A Pipeline Page tests', function() {
    let cookiebar = new CookieBar();
    let testPipelinePage = new TestPipelinePage();
    let EC = protractor.ExpectedConditions;

    beforeEach(function() {
		browser.get("#!/test-pipeline");
		//browser.sleep(1000);
        browser.wait(EC.presenceOf(testPipelinePage.adapter), 100000);
        cookiebar.closeIfPresent();
    });
    
    it('Should return a result after testing a pipeline', function() {
        testPipelinePage.testPipeline('Protractor test for Test A Pipeline page');
        testPipelinePage.result.getText().then(function(text) {
            expect(text).toBe('Hello World');
        });
    });
	
	it('Should return an alert message when testing a pipeline without setting the message', function() {
        testPipelinePage.testPipeline(' ');
        testPipelinePage.alertMessage.getText().then(function(text) {
            expect(text).toBe('Please specify a file or message!');
        });
    });
	
	it('Should return an alert message when testing a pipeline without selecting an adapter', function() {
        testPipelinePage.messageField.sendKeys('Oops, forgot to select an adapter');
		testPipelinePage.btnSend.click();
        testPipelinePage.alertMessage.getText().then(function(text) {
            expect(text).toBe('Please specify an adapter!');
        });
    });
	
	it('Should return an alert message when testing a pipeline without selecting an adapter and message', function() {
        testPipelinePage.btnSend.click();
        testPipelinePage.alertMessage.getText().then(function(text) {
            expect(text).toBe('Please specify an adapter and message!');
        });
    });
});