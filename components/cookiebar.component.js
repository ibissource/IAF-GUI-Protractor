var CookieBar = function(){
    this.cookiebar = element(by.css("div.cookie-bar"));
    this.btnSaveCookiePref = element(by.css("div.cookie-bar .actions button.btn.btn-primary"));

    this.closeIfPresent = function(){
        this.cookiebar.isPresent().then(cookiebarPresent => {
            if(cookiebarPresent) {
               this.btnSaveCookiePref.click();
            }
        });
    };
};

module.exports = CookieBar;