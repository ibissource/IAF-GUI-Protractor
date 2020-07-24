var TestPipelinePage = function() {
	this.adapter = element(by.css('[value="HelloWorld"]'))
	this.messageField = element(by.model('form.message'));
	this.btnSend = element(by.buttonText("Send"));
	this.result = element(by.exactBinding("result"));
	this.alertMessage = element(by.css('[role="alert"]'));
	
	this.testPipeline = function(message){
		this.adapter.click();
		this.messageField.sendKeys(message);
		this.btnSend.click();	
	};	
};
module.exports = TestPipelinePage;