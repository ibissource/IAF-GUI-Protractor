const CookieBar = require('./components/cookiebar.component');
const ExecuteQueryPage = require('./pages/execute-query.page');

describe('Execute Query Page tests', function() {
    let cookiebar = new CookieBar();
    let querypage = new ExecuteQueryPage();
    let EC = protractor.ExpectedConditions;

    beforeAll(function() {
        browser.get("#!/jdbc/execute-query");
        browser.wait(EC.visibilityOf(querypage.queryField), 100000);
        cookiebar.closeIfPresent();
    });
    
    it('Should return a result after executing a query', function() {
        querypage.sendQuery("CREATE TABLE IF NOT EXISTS bla(bla1 int, bla2 int)");
        querypage.btnReset.click();
        querypage.sendQuery("select * from bla");
        browser.wait(EC.visibilityOf(querypage.result), 2000);
        querypage.result.getText().then(function(text) {
            expect(text).toBe('"BLA1","BLA2"');
        });
    });

    it('Should reset the form when clicking the reset button', function() {
        querypage.queryField.sendKeys('Bla bla bla');
        querypage.btnReset.click();
        querypage.queryField.getText().then(function(text) {
            expect(text).toBe('');
        });
    });

    it('Should return an error when executing a false query', function() {
        querypage.queryField.sendKeys('This is a false query');
        querypage.btnSend.click();
        browser.wait(EC.visibilityOf(querypage.warning), 1000);
        querypage.warning.getText().then(function(text) {
            expect(text).toBe('error');
        });
    });
});