# iaf-gui-protractor

## Requirements
Make sure you have the following installed beforehand:
1. [NodeJS](https://nodejs.org/en/)
2. [Protractor](https://www.protractortest.org/#/)

When using this test suite for the first time, you need to install the project dependencies. You have to do this by using NPM package manager in your terminal: 

1. Navigate to project root folder
2. Install dependencies by running ```npm i```

## Getting started
To run all tests, run the ```protractor conf.js``` command from the project root folder.

## Making new tests
__Tests are specified in the .spec.js files, we are using [this styleguide](https://github.com/CarmenPopoviciu/protractor-styleguide) for tests.__

To make sure each specfile will run correctly, we use a "beforeAll" to prepare for the tests:
1. ```browser.get``` to load the page
2. ```browser.wait``` to wait for an important element, to make sure the page is loaded correctly.
3. A function to close the cookiebar if present. To make sure protractor can click elements.
