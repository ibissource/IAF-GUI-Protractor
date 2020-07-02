var ladybugPage = function() {
	this.stage = element.all(by.className("m-r-sm stage")).get(0);
	this.iframe = element(by.tagName('iframe'));
	this.pipeline = element(by.id('c_33_tr_0'));
	this.report = element(by.id('c_40')).all(by.tagName('table')).get(1); 
	this.copyTab = element(by.id('c_41')).all(by.tagName('table')).get(0).all(by.tagName('td')).get(6);
	this.testTab = element(by.id('c_10_header_td_42'));
	this.selectAllTab = element(by.id('c_235_cell_c_240'));
	this.refreshTab = element(by.id('c_235_cell_c_236'));
	this.reportList = element(by.id('c_234')).all(by.xpath('div/div'));
	this.deleteTab = element(by.id('c_235_cell_c_245'));
	this.confirmDelete = element(by.cssContainingText('tr','No, cancel this action')).all(by.tagName('td')).get(0);
	this.runTab = element(by.id('c_235_cell_c_237'));
	this.errorMessage = element(by.css('[style="color:#ffffff;background-color:#d84953;"]'));
	
	this.disableReportGenerator = function() {
		element(by.id('c_15_cell_c_17')).click();
		element(by.id('c_64')).$('[id="c_64_item_1"]').click();		
		element(by.id('c_60_close')).click();
	};
	
};
module.exports = ladybugPage;