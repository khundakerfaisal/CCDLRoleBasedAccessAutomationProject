import { test, expect } from "@playwright/test"
import LoginPage from "../../Pages/LoginPage"
import RFQPage from "../Pages/RFQPage"

test.describe("Create Rfq", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.CCLLogin("Admin", "1234");
    })
    test("Create New RFQ", async ({ page }) => {
        const rfqPage = new RFQPage(page);
        await rfqPage.CCLRfq();
    })
})
// npx playwright test tests/Rfq.spec.js --debug