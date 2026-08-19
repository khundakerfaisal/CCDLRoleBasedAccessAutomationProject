import { test, expect } from "@playwright/test"
import LoginPage from "../../Pages/LoginPage"
import PurchaseRequisition from "../../Pages/PurchaseRequisition"
import RFQPage from "../../Pages/RFQPage"
import CSPage from "../../Pages/CSPage"

test.describe("Local PO Flow", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // await loginPage.CCLLogin("Admin", "1234")
        await loginPage.CCLLogin("devops", "@Dev2025");

    })
    test("Create Purchase Requisition", async ({ page }) => {
        const purchaseRequisition = new PurchaseRequisition(page);
        await purchaseRequisition.CCLPurchaseRequisition();
    })
    test("Create New RFQ", async ({ page }) => {
        const rfqPage = new RFQPage(page);
        await rfqPage.CCLRfq();
    })
    test("Create New CS", async ({ page }) => {
        const csPage = new CSPage(page);
        await csPage.CCLCSPage();
    })


})

//npx playwright test tests/POM/LocalPoFlow.spec.js
// npx playwright test POM/LocalPoFlow.spec.js -g "Create New CS"