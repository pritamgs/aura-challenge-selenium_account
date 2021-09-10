const webdriver = require('selenium-webdriver');
By = webdriver.By;

module.exports = {
    headingPersonalinfo : By.xpath("//h3[@class='page-subheading']"),
    welcomeMessage : By.xpath("//p[@class='info-account']"),
    accountForm : By.id("account-creation_form"),
    genderMale : By.id("id_gender1"),
    genderFemale : By.id(""),
    custFirstNameTextbox : By.id("customer_firstname"),
    custLastNameTextbox : By.id("customer_lastname"),
    passwordTextbox : By.id("passwd"),
    addressTextBox : By.id("address1"),
    cityTextBox : By.id("city"),
    stateDropdown : By.id("id_state"),
    zipTextBox : By.id("postcode"),
    phoneTextBox : By.id("phone_mobile"),
    personalinfoError : By.xpath("//div[@class='alert alert-danger']"),
    submitAccountButton : By.id("submitAccount"),
    selectState : function(state){return webdriver.By.xpath("//select[@id='id_state']/option[@value='"+state+"']") },
};