import { Browser, BrowserContext, chromium, Page } from "playwright"
import Anmelden from "../pages/Anmelden";
import Header from "../pages/Header";
import * as testdata from "../data/testdata.json"
import Env from "../pages/Environment";

describe('Register Feature', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let header: Header;
    let anmelden: Anmelden;

    

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false,slowMo:1000
        })
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(Env.test);
        header = new Header(page);
        anmelden = new Anmelden(page);
    })

    test('Register without clicking on submit button (Positive Scenario)', async () => {
        expect(page.url()).toBe("https://www.payback.at/");
        console.log('Current URL on in the address bar is: ' + page.url());
        await header.clickOnAcceptCookie(); //accept cookie
        await header.clickOnAnmeldenLink(); //click on ameldung
        await anmelden.clickOnNoPaybackCardRadioBtn();// click on no paybck radio button
        await anmelden.selectACard(); //selecting a card
        await anmelden.clickOnContinueBtn(); //clicking on continue button
        // await anmelden.enterEmailPass("PaybackAssessment@test.com", "1234"); //entering email and pin
        await anmelden.enterEmailPass(testdata.email, testdata.pin); //entering email and pin
        await anmelden.clickOnContinueBtn1();
        // await anmelden.enterPersonalDetails("HER", "IRFAN", "AHMAD", "21072000", "Volkser", "12", "12344", "Leiferde");
        await anmelden.enterPersonalDetails(testdata.anrede,testdata.vorname,testdata.nachname,testdata.Geburtsdatum,testdata.straße,testdata.hausnummer,testdata.PLZ,testdata.ORT);
        expect(await anmelden.requiredFieldErrorMsgCount()).toBe(0);
        
    })

    test('Verify the error messages on mandatory fields', async ()=>{
        expect(page.url()).toBe("https://www.payback.at/");
        console.log('Current URL on in the address bar is: ' + page.url());
        await header.clickOnAcceptCookie(); //accept cookie
        await header.clickOnAnmeldenLink(); //click on ameldung
        await anmelden.clickOnNoPaybackCardRadioBtn();// click on no paybck radio button
        await anmelden.selectACard(); //selecting a card
        await anmelden.clickOnContinueBtn(); //clicking on continue button
        await anmelden.enterEmailPass(testdata.email, testdata.pin); //entering email and pin
        await anmelden.clickOnContinueBtn1();
        await anmelden.clickOnJustOneStepBtn();
        await anmelden.printAllRequiredFieldErrorMsgs();
        expect(await anmelden.requiredFieldErrorMsgCount()).toBe(8);
        await anmelden.enterPersonalDetails(testdata.anrede,testdata.vorname,testdata.nachname,testdata.Geburtsdatum,testdata.straße,testdata.hausnummer,testdata.PLZ,testdata.ORT);
    })

    afterEach(async () => {
        await page.close();
        await context.close();
        await browser.close();
    })

})