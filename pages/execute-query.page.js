var ExecuteQueryPage = function () {
    this.queryField = element(by.model("form.query"));
    this.btnReset = element(by.buttonText("Reset"));
    this.btnSend = element(by.buttonText("Send"));
    this.warning = element(by.css(".alert.alert-warning"));
    this.result = element(by.exactBinding("result"));

    this.sendQuery = function(query) {
        this.queryField.sendKeys(query);
        this.btnSend.click();
    };
}

module.exports = ExecuteQueryPage;
