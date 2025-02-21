import { Locator, Page } from "@playwright/test";

export class ProductPage {
    
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productSortDropdown: Locator;

    constructor(page:Page){
        this.page = page;
        this.pageTitle = page.locator('.title'); 
    } 

}