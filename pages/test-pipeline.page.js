var TestPipelinePage = function() {
	this.adapterField = element(by.model('form.adapter'));
	this.messageField = element(by.model('form.message'));
	this.btnSend = element(by.buttonText("Send"));
	
	this.testPipeline = function(message){
		this.adapterField.$('[value="HelloWorld"]').click();
		this.messageField.sendKeys(message);
		this.btnSend.click();	
	};	
};
module.exports = TestPipelinePage;