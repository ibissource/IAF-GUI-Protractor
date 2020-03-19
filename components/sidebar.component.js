var SideBar = function () {
    this.toggle = element(by.css("a.navbar-minimalize"));
    this.expandedLogo = element(by.css(".nav-header .profile-element"));
    this.collapsedLogo = element(by.css(".nav-header .logo-element"));

    this.links = element(by.repeater(''));
}

module.exports = SideBar;