import {type Locator, type Page} from '@playwright/test';

export class CheckoutCompletePage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly thankYouMsg: Locator;
    readonly backHomeBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.thankYouMsg = page.locator('.complete-header');
        this.backHomeBtn = page.getByRole('button', {name :'Back Home'})
    }
}