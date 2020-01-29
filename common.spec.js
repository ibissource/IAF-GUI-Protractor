const CookieBar = require('./components/cookiebar.component');
const SideBar = require('./components/sidebar.component');
const Common = require('./components/common.component');

describe('Common tests', function() {
    let cookiebar = new CookieBar();
    let sidebar = new SideBar();
    let common = new Common();
    let EC = protractor.ExpectedConditions;

    beforeAll(function() {
        browser.get("#!/status");
        browser.wait(EC.visibilityOf(common.serverTime), 100000);
        browser.wait(EC.visibilityOf(common.stage), 10000);
        cookiebar.closeIfPresent();
        // Wait until all text fields have there text set (no longer empty string). We test this
        // by waiting for the last text field, which we assume to be the otap stage.
        browser.wait(function() {return common.stage.getText().then(function(text) {
            return text != ""
        })}, 10000)
    });

    it("Should display the correct date in the upper right", function() { 
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        today = yyyy+'-'+mm+'-'+dd;
        browser.waitForAngularEnabled(false);
        common.serverTime.getText().then(function(text){
            expect(text).toContain(today);
        });
        browser.waitForAngularEnabled(true);
    });

    it("Should collapse and expand the menu when clicking the hamburger", function() {
        expect(sidebar.toggle.isPresent()).toBe(true);
        expect(sidebar.expandedLogo.isDisplayed()).toBe(true);
        sidebar.toggle.click();
        expect(sidebar.expandedLogo.isDisplayed()).toBe(false);
        expect(sidebar.collapsedLogo.isDisplayed()).toBe(true);
        sidebar.toggle.click();
    });

    it("Should show the feedback modal after clicking a rating star", function() {
        expect(common.feedbackStar.isPresent()).toBe(true);
        common.feedbackStar.click();
        expect(common.feedbackModal.isDisplayed()).toBe(true);
        common.feedbackClose.click();
    });
});