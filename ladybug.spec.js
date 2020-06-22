var ladybug = require('./pages/ladybug.page');
describe('Test voor Ladybug foutmelding', function(){	
	var EC = protractor.ExpectedConditions;	
	it('Should give an error message', function(){
		browser.waitForAngularEnabled(false);
		browser.get('#!/testing/ladybug');
		browser.wait(EC.visibilityOf(ladybug.stage), 30000);
		//Wait until all text fields have there text set (no longer empty string).
		browser.wait(function() {return ladybug.stage.getText().then(function(result) {
            return result != ""
        })}, 30000);			
		// switch to iframe
		browser.switchTo().frame(ladybug.iframe.getWebElement());					
		// select the first pipeline from the storage
		ladybug.pipeline.click();
		// select the first pipeline report from "Reports"
		browser.wait(EC.presenceOf(ladybug.report), 3000);
		ladybug.report.click();		
		// copy the report
		browser.wait(EC.visibilityOf(ladybug.copyTab), 3000);
		ladybug.copyTab.click();
		browser.manage().timeouts().implicitlyWait(3000);
		// set "Report generator enabled" No
		ladybug.disableReportGenerator();			
		// go to "Test" tab
		ladybug.testTab.click();		
		// click on "Select all" and then "Delete", so can locate the new report 		
		ladybug.reportList.count().then(function(result){
			if(result > 2){
				ladybug.selectAllTab.click();
				ladybug.deleteTab.click();
				browser.wait(EC.visibilityOf(ladybug.confirmDelete), 3000);
				ladybug.confirmDelete.click();								
			} else {
				ladybug.refreshTab.click();				
			}
		});	
		browser.sleep(500);
		// select the new report, run and refresh.		
		ladybug.selectAllTab.click();		
		ladybug.runTab.click();		
		ladybug.refreshTab.click();
		ladybug.errorMessage.getText().then(function(result){
			expect(result).toContain('Result report not found. Report generator not enabled?');
		});						
	});
});