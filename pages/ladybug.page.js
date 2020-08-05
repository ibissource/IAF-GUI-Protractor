var LadybugPage = function() {
	// Ladybug Debug Page components	
	this.iframe = element(by.tagName('iframe'));
	this.refreshDebug = element(by.id('c_16'));
	this.optionsTab = element(by.id('c_17'));
	this.openAllTab = element(by.id('c_21'));
	this.collapseAllTab = element(by.id('c_23'));
	this.closeAllTab = element(by.id('c_24'));
	this.numOfReportsVisible = element(by.id('c_29'));
	this.reportsInStorage = element(by.id('c_33_tbody')).all(by.tagName('tr'));
	this.firstReportInStorage = element(by.id('c_33_tr_0'));
	this.reportsDirectory = element(by.id('c_40')).all(by.tagName('table'));
    this.toggleReports = element(by.id('tree|c_40|expando|toggle|[root]'));
	this.report = element(by.id('c_40')).element(by.css("table:nth-child(2)"));
	this.copyTab = element(by.id('c_41')).element(by.css("table:nth-child(1)")).element(by.css("td:nth-child(7)"));
	this.closeOptions = element(by.id('c_60_close'));
	this.pipelineMessage = element(by.css('[valign="top"]'));
	this.enableGeneratorOption = element(by.id('c_64_item_0'));
	this.disableGeneratorOption = element(by.id('c_64_item_1'));
	
	this.enableReportGenerator = function() {
		this.optionsTab.click();
		this.enableGeneratorOption.click();		
		this.closeOptions.click();
	};
	this.disableReportGenerator = function() {
		this.optionsTab.click();
		this.disableGeneratorOption.click();		
		this.closeOptions.click();
	};
							
	// Ladybug Test Page components
	this.testTab = element(by.id('c_10_header_td_42'));
	this.selectAllTab = element(by.id('c_235_cell_c_240'));
	this.refreshTab = element(by.id('c_235_cell_c_236'));
	this.reportList = element(by.id('c_234')).all(by.xpath('div/div'));
	this.deleteTab = element(by.id('c_235_cell_c_245'));
	this.confirmDelete = element(by.cssContainingText('tr','No, cancel this action')).element(by.css("td:nth-child(1)"));
	this.runTab = element(by.id('c_235_cell_c_237'));
	this.errorMessage = element(by.css('[style="color:#ffffff;background-color:#d84953;"]'));
};
module.exports = LadybugPage;