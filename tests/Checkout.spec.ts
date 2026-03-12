import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {

  test('User can add 3 products and checkout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Login to SauceDemo', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Add 3 products to cart', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.addBikelightToCart();
      await inventoryPage.addTshirtToCart();
      await inventoryPage.verifyCartCount(3);
      await inventoryPage.goToCart();
    });

    await test.step('Verify cart and checkout', async () => {
      await cartPage.verifyItemsCount(3);
      await cartPage.clickCheckout();
    });

    await test.step('Complete checkout process', async () => {
      await checkoutPage.fillCheckoutInfo();
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify checkout success', async () => {
      await checkoutPage.verifyCheckoutSuccess();
    });
  });

});
