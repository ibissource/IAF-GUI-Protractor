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
		ladybug.refreshDebug.click();
		browser.sleep(1000);
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

	beforeAll(function() {
		prepare();
		ladybug.debugTab.click();
		ladybug.enableReportGenerator();
		// Ideally, tests should not depend on each other. This ideal cannot
		// be implemented however because we cannot remove Ladybug reports from
		// the table in the test tab.
		//
		// Test "Should list the correct number of reports in the storage when input a number"
		// configures that at most 3 reports should be visible and expects to have 3 reports then.
		// This test only makes sense if there are 4 or more reports during that test.
		//
		// Test "When I enable the report generator, test a pipeline and then refresh, should appear a new report in the storage"
		// creates one Ladybug report. We need to create 3 more to have meaningful tests.
		testAPipeline("msg 1");
		testAPipeline("msg 2");
		testAPipeline("msg 3");
		ladybug.debugTab.click();
	});

	afterAll(function(){
		prepare();
		ladybug.debugTab.click();
		ladybug.enableReportGenerator();
		teardown();
	})

	it('When I enable the report generator, test a pipeline and then refresh, should appear a new report in the storage', function() {
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
		expect(ladybug.reportsInStorage.count()).toBeGreaterThanOrEqual(5);
		ladybug.numOfReportsVisible.clear().sendKeys(3);
		// The sendKey command did not do enter. Using the entered value can also be done by pressing refresh.
		ladybug.refreshDebug.click();
		browser.wait(EC.invisibilityOf(ladybug.reportsInStorage.get(4)), 3000, 'timeouts, numOfReportsVisible is more than 3');
		// Include the header row
		expect(ladybug.reportsInStorage.count()).toBe(4);
		// Set it back to default value
		ladybug.numOfReportsVisible.clear().sendKeys(10);
		ladybug.refreshDebug.click();
		browser.wait(EC.visibilityOf(ladybug.reportsInStorage.get(4)), 3000, 'The fourth report did not become visible');
		expect(ladybug.reportsInStorage.count()).toBeGreaterThanOrEqual(5);
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
		// At least four reports and a root node
		expect(ladybug.reportsDirectory.count()).toBeGreaterThanOrEqual(5);
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
		browser.sleep(1000);
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