var TestPipelinePage = function() {
	this.configuration = element(by.cssContainingText('option', 'Frank2Example'));
	this.adapter = element(by.cssContainingText('option', 'HelloWorld'));
	this.messageField = element(by.model('form.message'));
	this.btnSend = element(by.buttonText("Send"));
	this.result = element(by.exactBinding("result"));
	this.alertMessage = element(by.css('[role="alert"]'));
	
	this.testPipeline = function(message){
		this.configuration.click();
		let EC = protractor.ExpectedConditions;
		browser.wait(EC.elementToBeClickable(this.adapter), 10000);
		browser.sleep(1000);
		this.adapter.click();
		this.messageField.sendKeys(message);
		this.btnSend.click();	
	};	
};
module.exports = TestPipelinePage;