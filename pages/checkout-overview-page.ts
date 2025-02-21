import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly itemTotal: Locator;
    readonly taxAmount: Locator;
    readonly totalAmount: Locator;
    readonly finishBtn: Locator;
    readonly individualItemPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.individualItemPrice = page.locator('.inventory_item_price');
        this.itemTotal = page.locator('data-test="subtotal-label"');
        this.taxAmount = page.locator('.summary_tax_label');
        this.totalAmount = page.locator('.summary_total_label');
        this.finishBtn = page.getByRole('button', { name: 'Finish' });
    }

    /*
    This method calculate and verify the visible grand total value (item value + tax value) in the web page.
     */

    async verifyGrandTotalValue() {

        //Get the total price fro items in the checkout overview page.
        const productElements = await this.individualItemPrice.all();
        let itemPriceTotal = 0;
        for (let item of productElements) {
            const priceText = await item.textContent();
            const price = parseFloat(priceText?.replace(/[^\d.]/g, "") || '0');

            if (!isNaN(price)) {
                itemPriceTotal += price;
            }
        }
        

        //Extract the vissible tax value from the Tax label element.
        let taxtext = await this.taxAmount.textContent();
        let taxValue = parseFloat(taxtext?.replace(/[^\d.]/g, "") || '0');
        

        //Calculate the Grand total
        const calculatedGrandTotal = itemPriceTotal + taxValue;

        

        //Get the vissible Total value in web page
        let vissibleTotalValue = await this.totalAmount.textContent();
        let visibleTotalElementValue = parseFloat(vissibleTotalValue?.replace(/[^\d.]/g, "") || '0');

        //compare calculated grand total with vissibale grand total value.
        expect(visibleTotalElementValue).toEqual(Number(calculatedGrandTotal.toFixed(2)));
    }

    async confirmCheckout() {
        await this.finishBtn.click();
    }
}