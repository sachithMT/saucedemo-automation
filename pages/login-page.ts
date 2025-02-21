import {type Locator, type Page} from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;

    constructor (page: Page){
        this.page = page;
        this.userName = page.locator('#user-name');
        this.passWord = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async gotoApp(url: string){
        await this.page.goto(url);
    }

    async login(userName: string , passWord: string){
        await this.userName.fill(userName);
        await this.passWord.fill(passWord);
        await this.loginBtn.click();
    }
}