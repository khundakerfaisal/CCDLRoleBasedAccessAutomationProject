import { test, expect } from "@playwright/test"
import LoginPage from "../../Pages/LoginPage"
import LocalPoPage from "../Pages/LocalPO"

test.describe("Create CS", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.CCLLogin("Admin", "1234");
    })
    test("Create New CS", async ({ page }) => {
        const localPoPage = new LocalPoPage(page);
        await localPoPage.CCLLocalPo();
    })
})

//npx playwright test tests/localPo.spec.js