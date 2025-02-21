import { type Locator, type Page, expect } from '@playwright/test';


export class Helper {

    readonly page: Page;

    constructor(page) {
        this.page = page;
    }

    /* This function helps to select options from Dropdowns.*/
    async selectDropdownOption(dropdownSelector: string, optionSelector: string) {
        await this.page.locator(dropdownSelector).click();
        await this.page.locator(dropdownSelector).selectOption(optionSelector);
    }

    /* This method helps to verify number of Itmes in shopping cart tool tip */
    async verifyItemsInCartToolTip(numberOfItems: number) {
        await expect(this.page.locator('[data-test="shopping-cart-link"]', )).toContainText(numberOfItems.toString());
    }


    // /* This method helps to add products to shopping cart*/
    // async addProductToCart() {

    //     const productElements = await this.page.locator('.inventory_item').all();

    //     // Extract price and map to corresponding element
    //     const productsWithPrices = await Promise.all(
    //         productElements.map(async (product) => {
    //             const priceText = await product.locator('.inventory_item_price').textContent();
    //             const price = parseFloat(priceText ? priceText.replace(/[^\d.]/g, ""): "");
    //             return { price, product };
    //         }),
    //     );

    //     // Sort products by price in ascending order
    //     const sortedProducts = productsWithPrices.sort((a, b) => a.price - b.price);

    //     // Select the three lowest-priced items
    //     for (let i = 0; i < Math.min(3, sortedProducts.length); i++) {
    //         await sortedProducts[i].product.getByRole('button', { name: 'Add to cart' }).click();
    //         console.log(`Added item with price $${sortedProducts[i].price} to cart.`);
    //     }

    // }

    /* This method helps to add products to shopping cart*/
    async addProductToCart(productOrder: string, numberOfItems: number) {

        const productElements = await this.page.locator('.inventory_item').all();

        // Extract price and map to corresponding element
        const productsWithPrices = await Promise.all(
            productElements.map(async (product) => {
                const priceText = await product.locator('.inventory_item_price').textContent();
                const price = parseFloat(priceText ? priceText.replace(/[^\d.]/g, "") : "");
                return { price, product };
            }),
        );

        let sortedProducts;

        if (productOrder == 'Lowest') {
            // Sort products by price in ascending order
            sortedProducts = productsWithPrices.sort((a, b) => a.price - b.price);
        } if (productOrder == 'Highest') {
            // Sort products by price in decending order
            sortedProducts = productsWithPrices.sort((a, b) => b.price - a.price);
        }

        // Add the number of lowest or highest priced items to the cart
        for (let i = 0; i < Math.min(numberOfItems, sortedProducts.length); i++) {
            await sortedProducts[i].product.getByRole('button', { name: 'Add to cart' }).click();
            console.log(`Added item with price $${sortedProducts[i].price} to cart.`);
        }

    }


    /* This method helps to remove products from shopping cart*/
    async removeProductFromCart() {
        const productElements = await this.page.locator('.cart_item').all();

        // Extract price and map to corresponding element
        const productsWithPrices = await Promise.all(
            productElements.map(async (product) => {
                const priceText = await product.locator('.inventory_item_price').textContent();
                const price = parseFloat(priceText ? priceText.replace(/[^\d.]/g, "") : "");
                return { price, product };
            }),
        );

        // Sort products by price in ascending order
        const sortedProducts = productsWithPrices.sort((a, b) => a.price - b.price);

        // Select the three lowest-priced items
        for (let i = 0; i < Math.min(1, sortedProducts.length); i++) {
            await sortedProducts[i].product.getByRole('button', { name: 'Remove' }).click();
            console.log(`Removed item with price $${sortedProducts[i].price} from cart.`);
        }
    }

    // Verify the number of items in shopoing cart.
    async verifyNumberOfItemsInCart(numberOfItems: Number) {
        const products = this.page.locator('.cart_item').all();
        expect((await products).length).toBe(numberOfItems)
    }

}