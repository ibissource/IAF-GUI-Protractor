const LadybugPage = require('./pages/ladybug.page');
const TestPipelinePage = require('./pages/test-pipeline.page');
const CookieBar = require('./components/cookiebar.component');

describe('Ladybug Page tests', function(){	
	let EC = protractor.ExpectedConditions;	
	let ladybug = new LadybugPage();
	let testPipelinePage = new TestPipelinePage();
	let cookiebar = new CookieBar();
	browser.manage().timeouts().implicitlyWait(10000);
	
	beforeEach(function() {		
        browser.waitForAngularEnabled(false);
		browser.get('#!/testing/ladybug');
		browser.wait(EC.presenceOf(ladybug.iframe), 30000);		
        cookiebar.closeIfPresent();
		// switch to iframe
		browser.switchTo().frame(ladybug.iframe.getWebElement());
    });
	afterEach(function() {
		browser.switchTo().defaultContent();
	});
	
	it('Should appear a new report after refresh', function(){		
		ladybug.refreshDebug.click();
		ladybug.enableReportGenerator();		
		browser.switchTo().defaultContent();
		ladybug.goToTestPipeline();
		browser.waitForAngularEnabled(true);
		testPipelinePage.testPipeline('Protractor test for Refresh tab');		
		ladybug.sidebarLadybugTab.click();
		browser.waitForAngularEnabled(false);
		browser.switchTo().frame(ladybug.iframe.getWebElement());
		browser.wait(EC.presenceOf(ladybug.refreshDebug), 3000);
		ladybug.refreshDebug.click();
		browser.wait(EC.visibilityOf(ladybug.firstReportInStorage), 3000);
		ladybug.firstReportInStorage.click();
		browser.wait(EC.visibilityOf(ladybug.report), 3000);
		expect(element(by.cssContainingText('span','Protractor test for Refresh tab')).isPresent()).toBe(true);
	});
	
	it('Should not appear a new report after disabled Report Generator', function(){
		ladybug.refreshDebug.click();
		ladybug.disableReportGenerator();		
		browser.switchTo().defaultContent();
		ladybug.goToTestPipeline();
		browser.waitForAngularEnabled(true);
		testPipelinePage.testPipeline('Protractor test for Options tab');		
		ladybug.sidebarLadybugTab.click();
		browser.waitForAngularEnabled(false);
		browser.switchTo().frame(ladybug.iframe.getWebElement());
		browser.wait(EC.presenceOf(ladybug.refreshDebug), 3000);
		ladybug.refreshDebug.click();
		browser.wait(EC.visibilityOf(ladybug.firstReportInStorage), 3000);
		ladybug.firstReportInStorage.click();
		browser.wait(EC.visibilityOf(ladybug.report), 3000);
		expect(element(by.cssContainingText('span','Protractor test for Options tab')).isPresent()).toBe(false);
	});
	
	it('Should show correct amount of reports', function(){
		// Check for number of reports listed in the storage
		ladybug.numOfReportsVisible.clear().sendKeys(5);
		ladybug.refreshDebug.click();
		browser.wait(EC.invisibilityOf(ladybug.reportsInStorage.get(6)), 3000);
		expect(ladybug.reportsInStorage.count()).toBe(6);
		// Check for Open all tab
		ladybug.closeAllTab.click();
		ladybug.openAllTab.click();
		expect(ladybug.toggleReports.isPresent()).toBe(true);
		// Check for Collapse all tab
		ladybug.collapseAllTab.click();
		browser.wait(EC.invisibilityOf(ladybug.report), 3000);
		expect(ladybug.reportsDirectory.count()).toBe(1);
		// Check for Reports toggle and Open all tab indeed opens correct amount of reports
		ladybug.toggleReports.click();
		browser.wait(EC.visibilityOf(ladybug.report), 3000);
		expect(ladybug.reportsDirectory.count()).toBe(6);
		// Check for Close all tab
		ladybug.closeAllTab.click();
		browser.wait(EC.invisibilityOf(ladybug.report), 3000);
		expect(ladybug.toggleReports.isPresent()).toBe(false);		
	});
	
	it('Should give an error message', function(){							
		// select the first report from the storage
		browser.wait(EC.presenceOf(ladybug.firstReportInStorage), 3000);
		ladybug.firstReportInStorage.click();
		// select the first pipeline report from "Reports"
		browser.wait(EC.presenceOf(ladybug.report), 3000);
		ladybug.report.click();	
		browser.sleep(500);
		// copy the report
		browser.wait(EC.visibilityOf(ladybug.copyTab), 3000);
		ladybug.copyTab.click();
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