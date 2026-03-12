import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {

  test('Login success with valid credential', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Given user is on login page', async () => {
      await loginPage.goto();
    });

    await test.step('When user login with valid credential', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Then user should see products page', async () => {
      await loginPage.verifyLoginSuccess();
    });
  });

  test('Login failed with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Given user is on login page', async () => {
      await loginPage.goto();
    });

    await test.step('When user login with valid username and wrong password', async () => {
      await loginPage.login('standard_user', 'wrong_password');
    });

    await test.step('Then user should see error message', async () => {
      await loginPage.verifyLoginFailed(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });

  test('Login failed with wrong username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Given user is on login page', async () => {
      await loginPage.goto();
    });

    await test.step('When user login with wrong username', async () => {
      await loginPage.login('wrong_user', 'secret_sauce');
    });

    await test.step('Then user should see error message', async () => {
      await loginPage.verifyLoginFailed(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });

  test('Login failed without username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Given user is on login page', async () => {
      await loginPage.goto();
    });

    await test.step('When user clicks login without input credentials', async () => {
      await loginPage.login('', '');
    });

    await test.step('Then user should see error message', async () => {
      await loginPage.verifyLoginFailed(
        'Epic sadface: Username is required'
      );
    });
  });

});
