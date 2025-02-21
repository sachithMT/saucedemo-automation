import {type Locator, type Page} from '@playwright/test';

export class ShoppingCartPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shopingCartBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly removeBtn: Locator;

    constructor(page: Page){
       this.page = page;
       this.pageTitle = page.locator('.title');
       this.shopingCartBtn = page.locator('#shopping_cart_container');
       this.checkoutBtn = page.getByRole('button', {name :'Checkout'});
    }

    async openShoppingCart(){
        await this.shopingCartBtn.click()
    }

    async checkoutFromCart(){
        await this.checkoutBtn.click();
    }

    
}