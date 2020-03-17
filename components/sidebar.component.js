var SideBar = function () {
    this.toggle = element(by.css("a.navbar-minimalize"));
    this.minimize = element(by.css("i.fa.left.fa-angle-double-left"))
    this.maximize = element(by.css("i.fa.left.fa-angle-double-right"))
    this.expandedLogo = element(by.css(".nav-header .profile-element"));
    this.collapsedLogo = element(by.css(".nav-header .logo-element"));
}

module.exports = SideBar;