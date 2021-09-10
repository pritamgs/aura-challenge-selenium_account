const chromeDriver = require("../drivers/chrome");
const AuthenticationPage = require('../pages/authentication.page');
const PersonalinfoPage = require('../pages/personalinfo.page');
const commonHelper = require('../utils/helper.js');
const testData = commonHelper.getData('./src/data/testData.json')['testData'];
const webdriver = require('selenium-webdriver'); 

describe("Aura Code Challenge - Create User Account Tests", () => {
  let driver;
  beforeAll(() => {
    driver = chromeDriver();
  });

  afterAll(async () => {
    await driver.quit();
  });

  testData.forEach(function (tData){
  
    test("it verifies account creation : "+tData.type, async () => {
      await driver.get(
        "http://automationpractice.com/index.php?controller=authentication&back=my-account"
      );
      const title = await driver.getTitle();
      expect(title).toBe("Login - My Store");
      const headingCreateAccount = await driver.findElement(AuthenticationPage.headingCreateAccount).getText();
      expect(headingCreateAccount).toBe("CREATE AN ACCOUNT");
      await driver.findElement(AuthenticationPage.emailTextBox).sendKeys(tData.email);
      await driver.findElement(AuthenticationPage.createAccountButton).click();
      if (tData.type === "invalidEmail" || tData.type ==="existingEmail"){
        let emailError = await driver.findElement(AuthenticationPage.emailError);
        await driver.wait(webdriver.until.elementIsVisible(emailError),5000);
      }else{
        await driver.wait(webdriver.until.elementLocated(PersonalinfoPage.accountForm),15000);
        const headingPersonalinfo = await driver.findElement(PersonalinfoPage.headingPersonalinfo).getText();
        expect(headingPersonalinfo).toBe("YOUR PERSONAL INFORMATION");
        if(tData.type === "ValidPersonalData"){
          
          if(tData.gender === "Male")
            await driver.findElement(PersonalinfoPage.genderMale).click();
          await driver.findElement(PersonalinfoPage.custFirstNameTextbox).sendKeys(tData.firstName);
          await driver.findElement(PersonalinfoPage.custLastNameTextbox).sendKeys(tData.lastName);
          await driver.findElement(PersonalinfoPage.passwordTextbox).sendKeys(tData.password);
          await driver.findElement(PersonalinfoPage.addressTextBox).sendKeys(tData.address);
          await driver.findElement(PersonalinfoPage.cityTextBox).sendKeys(tData.city);
          await driver.findElement(PersonalinfoPage.stateDropdown).click();
          await driver.findElement(PersonalinfoPage.selectState(tData.state)).click();
          await driver.findElement(PersonalinfoPage.zipTextBox).sendKeys(tData.zip);
          await driver.findElement(PersonalinfoPage.phoneTextBox).sendKeys(tData.mobile);
          //await driver.sleep(120000);
          await driver.findElement(PersonalinfoPage.submitAccountButton).click();
          const welcomeMsg = await driver.findElement(PersonalinfoPage.welcomeMessage).getText();
          expect(welcomeMsg).toBe("Welcome to your account. Here you can manage all of your personal information and orders.");

        }else if (tData.type === "invalidPersonal"){
          await driver.findElement(PersonalinfoPage.submitAccountButton).click();
          let accountError = await driver.findElement(PersonalinfoPage.personalinfoError);
          await driver.wait(webdriver.until.elementIsVisible(accountError),5000);
        }
      }

    });
  });
});
