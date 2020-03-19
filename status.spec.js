const StatusPage = require('./pages/status.page');
const CookieBar = require('./components/cookiebar.component');

describe('Status Page tests', function() {
    let status = new StatusPage();
    let cookiebar = new CookieBar();
    let EC = protractor.ExpectedConditions;

    beforeAll(function() {
        browser.get("#!/status");
        browser.wait(EC.visibilityOf(status.adapter), 100000);
    });

    beforeEach(function() {
        cookiebar.closeIfPresent();
    });

    it("Should show filter buttons", function() {
        expect(status.filterStarted.isPresent()).toBe(true);
        expect(status.filterStopped.isPresent()).toBe(true);
        expect(status.filterWarning.isPresent()).toBe(true);
    });

    it("When I click the started filter button its background should turn to transparent",  function() {
        status.filterStarted.click();
        element(by.css("div.input-group input.form-control")).click(); //click element to remove focus
        browser.sleep(500);
        expect(status.filterStarted.getCssValue('background-color')).toEqual("rgba(0, 0, 0, 0)");
        status.filterStarted.click();
    });

    it("Should show the correct url when filters are clicked", function() {
        status.filterStarted.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/#!/status?filter=stopped%2Bwarning");
        status.filterStarted.click();

        status.filterStopped.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/#!/status?filter=started%2Bwarning");
        status.filterStopped.click();

        status.filterWarning.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/#!/status?filter=started%2Bstopped");
        status.filterWarning.click();
    });

    it("Should filter adapters when using the search field", function() {
        status.searchField.sendKeys("IbisDoc");
        browser.sleep(200);
        expect(status.adapters.count()).toBe(1);
        status.searchField.clear();
    }); 

    it("Should expand adapter info on single clicking the chevron", function() {
        status.adapterInfoToggle.click();
        browser.wait(EC.presenceOf(status.adapterInfo), 5000);
        expect(status.adapterInfo.isDisplayed()).toEqual(true);
        status.adapterInfoToggle.click();
    });

    it("Should use the correct URL when clicking configuration tabs", function() {
        status.configurations.each(function(configuration, i) {
            status.configurations.get(i).click();
            browser.sleep(100);
            status.configurations.get(i).getText().then(function(text) {
                status.configurations.get(i).element(by.css('a')).click();
                expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/#!/status?configuration=" + text);
            });
        });

        
    });

    it("Should show the correct amount of adapters when clicking configuration tabs", function() {
        status.configurations.each(function(configuration, i) {
            status.configurations.get(i).click();
            browser.sleep(100);
            status.summaryAdaptersStarted.getText().then(function(text){
                expect(parseInt(text)).toBe(status.adapters.count());
            }) 
        });
    });
});