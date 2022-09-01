import {chromium} from "playwright";

describe('Launch Browser', () => {

    test('Open Payback', async () => {
        console.log("This test has been commented");

        
        const broswer = await chromium.launch({
            headless:false , slowMo:900
        });
        const context = await broswer.newContext();
        const page = await context.newPage();
        await page.goto('https://www.payback.at/');

        expect(page.url()).toBe("https://www.payback.at/");
        console.log('Current URL on in the address bar is: ' + page.url());

        //Handling coockie prompt
        const acceptCookie = await page.$("//button[@id='onetrust-accept-btn-handler']");
        await acceptCookie?.click();

        // await page.click("//font[text()='Anmelden']");

        // await page.locator('text=Anmelden').click();

        const register = await page.$("text=Anmelden");
        await register?.click();

        console.log("User clicked on register link" );

        // // await page.click("(//label[@class='pb-radio__label'])[2]");
        // // await page.locator("(//label[@class='pb-radio__label'])[2]").click()

        const radioBtn = await page.$("(//label[@class='pb-radio__label'])[2]");
        await radioBtn?.click();

        console.log("User clicked on Noch keine PAYBACK Karte? Neue Karte auswählen. Radio Button" );

        // const card = await page.$("div[class='swiper-slide pb-card-picker__cards swiper-slide-duplicate'] div[class='pb-card-picker__single js__card-picker-card pb-card-picker__single_selected'] div[class='pb-card-picker__label'] font font");
        // await card?.click();

        console.log("user has selected the card");

        const continueBtn = await page.$("//div[@class='pb-sign-up-block-border-wrapper pb-sign-up-block-border-wrapper_first']//div[@class='pb-button pb-button_width_full pb-button_secondary pb-sign-up__button pb-sign-up__block-button js__sign-up-continue-btn']");
        await continueBtn?.click();

        console.log("user has clicked on continue button");

        const email = await page.$("input[name='email']");
        await email?.fill("Testing@gmail.com");

        const pin = await page.$("input[name='pin']");
        await pin?.fill("1234");

        const continueBtn1 =  await page.$("(//div[contains(@class,'pb-button pb-button_width_full')])[2]");
        await continueBtn1?.click();

        console.log("user has entered email, pin and clicked on continue");

        //Persönliche Daten

        //hiting enter without filling personal data
        const nurNochEinSchritt = await page.$("(//div[contains(@class,'pb-button pb-button_width_full')])[3]");
        nurNochEinSchritt?.click();


        await page.waitForSelector("//div[@class='pb-form-field__error-msg pb-form-field__error-msg_hidden']");
        const allErrorMsg = await page.$$("//div[@class='pb-form-field__error-msg pb-form-field__error-msg_hidden']");
        // console.log(await allErrorMsg.length);
        for(let i=0;i < allErrorMsg.length;i++){
            console.log(await allErrorMsg[i].innerText())
        }

        // mr or mrs
        const anrede =  await page.$("select[name='salutation']");
        await anrede?.selectOption({ value: '1' });

        const vorName = await page.$("input[name='firstName']");
        await vorName?.fill("Irfan");

        const nachName = await page.$("input[name='lastName']");
        await nachName?.fill("Ahmad");

        const geburtsDatum = await page.$("input[name='birthday']");
        await geburtsDatum?.type("21072000",{delay:100});
       
        const straße = await page.$("input[name='street']");
        await straße?.fill("test straße");

        const hausNummer = await page.$("input[name='floor']");
        hausNummer?.fill("1234")

        const plz = await page.$("input[name='zipCode']");
        await plz?.fill("Berlin");

        const ort = await page.$("input[name='city']");
        await ort?.fill("Alexderapltz");

        

        // await broswer.close();
    })


})