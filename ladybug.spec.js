const LadybugPage = require('./pages/ladybug.page');
const TestPipelinePage = require('./pages/test-pipeline.page');
const CookieBar = require('./components/cookiebar.component');

describe('Ladybug Page tests', function(){	
	let EC = protractor.ExpectedConditions;	
	let ladybug = new LadybugPage();
	let testPipelinePage = new TestPipelinePage();
	let cookiebar = new CookieBar();

	function testAPipeline(message) {
		browser.get('#!/test-pipeline');
		browser.waitForAngularEnabled(true);
		testPipelinePage.testPipeline(message);
		browser.get('#!/testing/ladybug');
		browser.switchTo().frame(ladybug.iframe.getWebElement());
		browser.waitForAngularEnabled(false);
		ladybug.debugTab.click();
		ladybug.refreshDebug.click();
		browser.sleep(300);
		ladybug.firstReportInStorage.click();
	};

	function prepare() {
		browser.get('#!/testing/ladybug');
		cookiebar.closeIfPresent();
		// switch to iframe
		browser.switchTo().frame(ladybug.iframe.getWebElement());
		browser.waitForAngularEnabled(false);
		browser.manage().timeouts().implicitlyWait(5000);
	}

	function teardown() {
		browser.switchTo().defaultContent();
		browser.waitForAngularEnabled(true);
		browser.manage().timeouts().implicitlyWait(0);
	}

	beforeEach(function() {
		prepare();
	});

	afterEach(function() {
		teardown();
	});

	afterAll(function(){
		prepare();
		ladybug.debugTab.click();
		ladybug.enableReportGenerator();
		teardown();
	})

	it('Should be able to open report in Test tab', function() {
		ladybug.testTab.click();
		ladybug.refreshTab.click();
		ladybug.reportList.count().then(function(result) {
			console.log("Number of reports: " + result);
			if(result >= 1) {
				browser.wait(EC.elementToBeClickable(ladybug.selectAllTab));
				ladybug.selectAllTab.click();
				ladybug.deleteTab.click();
				browser.wait(EC.elementToBeClickable(ladybug.confirmDelete), 3000);
				ladybug.confirmDelete.click();
				ladybug.debugTab.click();
			}
		});
		testAPipeline('Protractor test for error message');
		// select the first pipeline report from "Reports"
		browser.wait(EC.presenceOf(ladybug.report), 3000);
		ladybug.report.click();
		// copy the report
		browser.wait(EC.elementToBeClickable(ladybug.copyTab), 3000);
		ladybug.copyTab.click();
		ladybug.testTab.click();
		ladybug.refreshTab.click();
		ladybug.reportList.count().then(function(result) {
			ladybug.testTabFirstReportOpen.click();
		});
	});

	it('When I enable the report generator, test a pipeline and then refresh, should appear a new report in the storage ', function() {
		ladybug.refreshDebug.click();
		ladybug.enableReportGenerator();
		// First test a pipeline in the Test Pipeline page, then check for the result in Ladybug
		testAPipeline('Protractor test for Refresh tab');
		browser.sleep(3000);
		ladybug.pipelineMessage.getText().then(function(text) {
			expect(text).toContain('Protractor test for Refresh tab');
		});
	});
	
	it('When I disable the report generator, test a pipeline and then refresh, should not appear a new report in the storage', function() {
		ladybug.refreshDebug.click();
		ladybug.disableReportGenerator();
		// First test a pipeline in the Test Pipeline page, then check for the result in Ladybug
		testAPipeline('Report generator disabled, protractor test for Options tab');
		browser.sleep(3000);
		ladybug.pipelineMessage.getText().then(function(text) {
			expect(text).not.toContain('Report generator disabled, protractor test for Options tab');
		});
	});
	
	it('Should list the correct number of reports in the storage when input a number', function() {
		ladybug.numOfReportsVisible.clear().sendKeys(3);
		ladybug.refreshDebug.click();
		browser.wait(EC.invisibilityOf(ladybug.reportsInStorage.get(4)), 3000, 'timeouts, numOfReportsVisible is more than 3');
		expect(ladybug.reportsInStorage.count()).toBe(4);
		// Set it back to default value
		ladybug.numOfReportsVisible.clear().sendKeys(10);
		ladybug.refreshDebug.click();
	});
	
	it('Should show correct amount of reports when I click certain tabs', function() {
		// Should open all reports in the reports directory when I click Open all tab
		ladybug.closeAllTab.click();
		ladybug.openAllTab.click();
		expect(ladybug.toggleReports.isPresent()).toBe(true);
		// Should collapse all reports in the reports directory when I click Collepse all tab
		ladybug.collapseAllTab.click();
		browser.wait(EC.invisibilityOf(ladybug.report), 3000);
		expect(ladybug.reportsDirectory.count()).toBe(1);
		// Should open correct number of reports in the reports directory when I click Open all tab
		ladybug.toggleReports.click();
		browser.wait(EC.visibilityOf(ladybug.report), 3000);
		expect(ladybug.reportsDirectory.count()).toBe(11);
		// Should close all reports in the reports directory when I click Close all tab
		ladybug.closeAllTab.click();
		browser.wait(EC.invisibilityOf(ladybug.report), 3000);
		expect(ladybug.toggleReports.isPresent()).toBe(false);
	});
	
	it('Should give an error message in the test page when running a report after disabled the report generator', function() {
		ladybug.enableReportGenerator();
		testAPipeline('Protractor test for error message');
		// select the first pipeline report from "Reports"
		browser.wait(EC.presenceOf(ladybug.report), 3000);
		ladybug.report.click();
		// copy the report
		browser.wait(EC.elementToBeClickable(ladybug.copyTab), 3000);
		ladybug.copyTab.click();
		// set "Report generator enabled" No
		ladybug.disableReportGenerator();
		// go to "Test" tab
		ladybug.testTab.click();
		// click on "Select all" and then "Delete", so can locate the new report
		ladybug.reportList.count().then(function(result) {
			if(result > 2) {
				ladybug.selectAllTab.click();
				ladybug.deleteTab.click();
				browser.wait(EC.elementToBeClickable(ladybug.confirmDelete), 3000);
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
		ladybug.errorMessage.getText().then(function(text) {
			expect(text).toContain('Result report not found. Report generator not enabled?');
		});
	});
});