var SideBar = function () {
    this.toggle = element(by.css("a.navbar-minimalize"));
    this.expandedLogo = element(by.css(".nav-header .profile-element"));
    this.collapsedLogo = element(by.css(".nav-header .logo-element"));
}

module.exports = SideBar;