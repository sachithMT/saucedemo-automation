# Playwright Test Automation Framework

This repository contains a test automation framework developed using [Playwright](https://playwright.dev/) and TypeScript for https://www.saucedemo.com/ web application. 

It follows the Page Object Model (POM) design pattern and includes reusable helper methods, Allure reporting, and video recording on test failure.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

## Installation

Clone this repository and install dependencies:

```sh
git clone https://github.com/sachithMT/saucedemo-automation.git
cd <your-project-directory>
npm install
```

## Project Structure

The framework follows the Page Object Model (POM) to enhance maintainability and scalability:

- `tests/` - Contains test scripts
- `pages/` - Stores Page Object classes
- `utils/` - Contains reusable helper methods
- `reports/` - Stores generated test reports
- `.env`     - store app url and credentials

## Running Tests

To execute tests, use the following command:

```sh
npx playwright test
```

### Running Tests with Allure Reporting
First you need to integrate allure reporting [Allure Reporting and Playwright: Quick Setup Guide](https://medium.com/@merisstupar11/allure-reporting-and-playwright-quick-setup-powerful-insights-900a237a524d)

If you have integrated Allure reporting, run:

```sh
npx playwright test
```

Then generate and open the report:

```sh
allure generate allure-results --clean
allure open
```

### Video Recording on Test Failure
The framework automatically records test execution videos upon failure. You can find the recorded videos in the `playwright-report/` directory.

## Writing Tests

Playwright with TypeScript writing tests. Example:

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
```

## Continuous Integration (CI)

To run tests in a CI/CD pipeline, configure your `.github/workflows` or any other CI provider settings accordingly.

## Contributing

Feel free to fork the repository, create a new branch, and submit a pull request.


