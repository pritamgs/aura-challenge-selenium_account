const webdriver = require('selenium-webdriver');
By = webdriver.By;

module.exports = {
    headingCreateAccount : By.xpath("//h3[@class='page-subheading']"),
    emailTextBox : By.id("email_create"),
    createAccountButton : By.id("SubmitCreate"),
    emailError : By.id("create_account_error"),
};