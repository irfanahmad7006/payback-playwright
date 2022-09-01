import { Page } from "playwright";

export default class Anmelden {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    //Property
    public get noPaybackCardRadioBtn() {
        return this.page.$("label[for='cardSectionVariant-cardPicker']");
    }

    public get eleBpCard() {
        return this.page.$("//div[@id='card-picker-slider-wrapper']/div[2]/div[2]/div[1]/div");
    }

    public get eleContinueBtn() {
        return this.page.$("//div[@class='pb-sign-up-block-border-wrapper pb-sign-up-block-border-wrapper_first']//div[@class='pb-button pb-button_width_full pb-button_secondary pb-sign-up__button pb-sign-up__block-button js__sign-up-continue-btn']");
    }

    public get eleEmail() {
        const ele = this.page.$("input[name='email']");
        if (ele != null) {
            return ele;
        } else throw new Error("Not Found");
    }

    public get elePIN() {
        const ele = this.page.$("input[name='pin']");
        if (ele != null) {
            return ele;
        } else throw new Error("Not Found");
    }

    public get eleContinueBtn1() {
        return this.page.$("(//div[contains(@class,'pb-button pb-button_width_full')])[2]");
    }

    public get justOneStepBtn() {
        return this.page.$("(//div[contains(@class,'pb-button pb-button_width_full')])[3]");
    }

    public get anrede() {
        return this.page.$("select[name='salutation']");
    }

    public get vorname() {
        return this.page.$("input[name='firstName']");
    }

    public get nachName() {
        return this.page.$("input[name='lastName']");
    }

    public get geburtsDatum() {
        return this.page.$("input[name='birthday']");
    }

    public get straße() {
        return this.page.$("input[name='street']");
    }

    public get hausNummer() {
        return this.page.$("input[name='floor']");
    }

    public get plz() {
        return this.page.$("input[name='zipCode']");
    }

    public get ort() {
        return this.page.$("input[name='city']");
    }

    public get allErrorMsgs() {
        return this.page.$$("//div[@class='pb-form-field__error-msg pb-form-field__error-msg_hidden' and @style='display: block;']");
    }

    //Methods or Functions
    public async clickOnNoPaybackCardRadioBtn() {
        const ele = await this.noPaybackCardRadioBtn;
        await ele?.click();
    }

    public async selectACard() {
        const ele = await this.eleBpCard;
        ele?.click;
    }

    public async clickOnContinueBtn() {
        const continueBtn = await this.eleContinueBtn;
        await continueBtn?.click();
    }

    public async enterEmailPass(email: string, pass: string) {
        const mail = await this.eleEmail;
        const pin = await this.elePIN;

        await mail?.fill(email);
        await pin?.fill(pass);
    }

    public async clickOnContinueBtn1() {
        const continueBtn = await this.eleContinueBtn1;
        await continueBtn?.click();
    }

    public async enterPersonalDetails(anrede: string, vorname: string, nachName: string, geburtsDatum: string, straße: string, hausNummer: string, plz: string, ort: string) {
        const eleAnrede = await this.anrede;
        await eleAnrede?.selectOption({ label: anrede });

        const eleVorname = await this.vorname;
        await eleVorname?.fill(vorname);

        const eleNachname = await this.nachName;
        await eleNachname?.fill(nachName);

        const eleGeburtsdatum = await this.geburtsDatum;
        await eleGeburtsdatum?.type(geburtsDatum, { delay: 10 });

        const eleStraße = await this.straße;
        await eleStraße?.fill(straße);

        const eleHausnummer = await this.hausNummer;
        await eleHausnummer?.fill(hausNummer);

        const elePLZ = await this.plz;
        await elePLZ?.fill(plz);

        const eleORT = await this.ort;
        await eleORT?.fill(ort);
    }

    public async clickOnJustOneStepBtn() {
        const continueBtn = await this.justOneStepBtn;
        await continueBtn?.click();
    }

    public async printAllRequiredFieldErrorMsgs() {
        await this.page.waitForSelector("//div[@class='pb-form-field__error-msg pb-form-field__error-msg_hidden']");
        const errMsgs = await this.allErrorMsgs;
        for (let i = 0; i < errMsgs.length; i++) {
            console.log(await errMsgs[i].innerText())
        }
    }

    public async requiredFieldErrorMsgCount(){
        return (await this.allErrorMsgs).length;
    }
}