var StatusPage = function () {
    this.filterStarted = element(by.css("div.btn-group label.btn-primary"));
    this.filterStopped = element(by.css("div.btn-group label.btn-danger"));
    this.filterWarning = element(by.css("div.btn-group label.btn-warning"));
    
    this.searchField = element(by.model("searchText"));

    this.adapter = element.all(by.repeater("adapter in adapters")).get(0);
    this.adapterInfo = this.adapter.element(by.css('.ibox-content'));
    this.adapterInfoToggle = this.adapter.element(by.css('.ibox-title'));
    this.adapterToggle = this.adapterInfo.all(by.css('.table .btn.btn-xs')).get(0);

    this.adapters = element.all(by.repeater("adapter in adapters"));

    // this.btnDisableSearchText = element(by.css("div.input-group i.fa.fa-times.input-group-closeSearch"))
    // this.btnStopAllAdapters = element(by.css("div.pull-left button.btn.btn-danger.btn-xs"));
    // this.btnStartAllAdapters = element(by.css("div.pull-left button.btn.btn-primary.btn-xs"));
    // this.btnFullReload = element.all(by.css("button.btn.btn-info.btn-xs i.fa.fa-undo")).get(1);
    // this.btnShowAdapterRef = element(by.css("div.text-center i.fa.fa-file-picture-o"));
    // this.btnOpenAllAdapters = element(by.css("div.text-right.pull-right i.fa.fa-angle-double-down.fa-size-up"));
    // this.btnCollapseAllAdapters = element(by.css("div.text-right.pull-right i.fa.fa-angle-double-up.fa-size-up"));
    // this.btnAdapterStatus = element.all(by.css("div.sidebar-collapse span.nav-label")).get(0);
    // this.btnStar1RateUs = element(by.css("i.fa.fa-star-o.rating0"));
    // this.feedBackForm = element(by.css("div.modal-content"));
    // this.btnFeedBackFormClose = element(by.css("button.btn.btn-white"));
    // this.btnExpandInteractiveConsole = element.all(by.css("i.fa.fa-bars")).get(0);
    // this.btnLogoIAF = element(by.css("li.nav-header div.logo-element"));
    // this.btnLogging = element.all(by.css("span.nav-label")).get(3);
    // this.btnTesting = element.all(by.css("span.nav-label")).get(4);
    // //this.btnTestPipeline = element(by.linkUiSref("pages.test_pipeline"));
    // this.btnSelectAdapterDDown = element(by.css("select.form-control.m-b.ng-pristine"));
    // this.testPipelineDropDownselection2 = element.all(by.repeater("adapter in adapters")).get(2);
    // this.tabIAFUtil = element.all(by.repeater("configuration in configurations")).get(0);
    // this.tabIADWebControl = element.all(by.repeater("configuration in configurations")).get(1);
    // this.tabIbis4Example = element.all(by.repeater("configuration in configurations")).get(2);
    // this.tabAll = element.all(by.css("div.col-lg-12 li a")).get(0);


    // this.getCountAdapters = function() {
    //     return new Promise(function(resolve, reject){
    //         element.all(by.repeater("adapter in adapters")).count().then( (count) => {resolve(count)} );
    //     });
    // };

    // this.search = function(query) {
    //     this.searchBar.sendKeys(query);
    // }
}

module.exports = StatusPage;
