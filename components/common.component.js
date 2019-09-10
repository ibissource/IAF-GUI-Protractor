var Common = function () {
    this.feedbackStar = element(by.css("i.fa.fa-star-o.rating0"));
    this.feedbackModal = element(by.css("div.modal-content"));
    this.feedbackClose = this.feedbackModal.element(by.css("button.btn.btn-white"));

    this.serverTime = element(by.css(".nav .serverTime"));
};

module.exports = Common;