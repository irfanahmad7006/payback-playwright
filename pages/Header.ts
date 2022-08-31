import { Page } from "playwright";

export default class Header{
    private page: Page;
    constructor (page: Page){
        this.page=page;
    }

    //Property
    public get eleAnmeldenLink(){
        const anmeldenLinkEle = this.page.$("text=Anmelden");
        if(anmeldenLinkEle != null){
            return anmeldenLinkEle;
        } else throw new Error("Not Found");
    }

    public get eleCookieAccept(){
        const acceptCookie = this.page.$("//button[@id='onetrust-accept-btn-handler']");
        if(acceptCookie != null){
            return acceptCookie;
        } else throw new Error("Not Found");
    }

    //Functions or Methods
    public async clickOnAnmeldenLink(){
        const ele = await this.eleAnmeldenLink;
        await ele?.click();
    }

    public async clickOnAcceptCookie(){
        const ele = await this.eleCookieAccept;
        await ele?.click();
    }

}