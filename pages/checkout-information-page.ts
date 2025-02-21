import { type Locator, type Page } from '@playwright/test';

export class CheckoutInformationPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title')
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
    }

    async sumbitCheckoutInfo(firstname: string, lastName: string, zipcode: string){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipcode);
        await this.continueBtn.click();
    }
}