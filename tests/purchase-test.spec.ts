import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductPage } from "../pages/products-page";
import { Helper } from "../utils/helper";
import { CheckoutInformationPage } from "../pages/checkout-information-page";
import { CheckoutOverviewPage } from "../pages/checkout-overview-page";
import { CheckoutCompletePage } from "../pages/checkout-complete-page";
import { ShoppingCartPage } from "../pages/shopping-cart-page";

/* Get app URL, Username and Password from .env file */
const URL = process.env.BASE_URL as string;
const USERNAME = process.env.APP_USERNAME as string;
const PASSWORD = process.env.APP_PASSWORD as string;


test('Purchase order test', async({page}) =>{
    const helper = new Helper(page);

    //Login page steps
    const loginPage  = new LoginPage(page);
    await loginPage.gotoApp(URL);
    await loginPage.login(USERNAME,PASSWORD);
    
    //Product Page steps
    const productPage = new ProductPage(page)
    await expect(productPage.pageTitle).toHaveText('Products');    
    await helper.selectDropdownOption('.product_sort_container', 'Price (high to low)');
    await helper.addProductToCart('Lowest',3);
    await helper.verifyItemsInCartToolTip(3)

    //Shoping cart Page steps
    const shoppingCart = new ShoppingCartPage(page);
    await shoppingCart.openShoppingCart();
    await expect(shoppingCart.pageTitle).toContainText('Your Cart');
    await helper.verifyNumberOfItemsInCart(3);
    await helper.removeProductFromCart();
    await helper.verifyNumberOfItemsInCart(2);
    await shoppingCart.checkoutFromCart();

    //Checkout Information page steps
    const chekoutInfo = new CheckoutInformationPage(page);
    await expect(chekoutInfo.pageTitle).toContainText('Checkout: Your Information');
    await chekoutInfo.sumbitCheckoutInfo('Sachith','Palihawadana','80000');

    //Checkout Overview Page steps
    const checkoutOverview = new CheckoutOverviewPage(page);
    await helper.verifyNumberOfItemsInCart(2);
    await checkoutOverview.verifyGrandTotalValue();
    await checkoutOverview.confirmCheckout();

    //Checkout Complete Page steps
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.pageTitle).toContainText('Checkout: Complete!');
    await expect(checkoutCompletePage.thankYouMsg).toContainText('Thank you for your order!');
    await expect(checkoutCompletePage.backHomeBtn).toBeVisible();

    //await page.close()
})