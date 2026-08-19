import { test, expect } from "@playwright/test"
import LoginPage from "../../Pages/LoginPage"
import CSPage from "../Pages/CSPage"

test.describe("Create CS", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.CCLLogin("Admin", "1234");
    })
    test("Create New CS", async ({ page }) => {
        const csPage = new CSPage(page);
        await csPage.CCLCSPage();
    })
})

//npx playwright test tests/CS.spec.js