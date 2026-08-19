import { test } from "@playwright/test";
import fs from "fs";

import LoginPage from "../../Pages/LoginPage";
import SalesOrderInputPageBulk from "../../Pages/Sales/salesOrderBulk";
import DeliveryAdvicePage from "../../Pages/Sales/DeliveryAdvice";
import FleetPage from "../../Pages/Fleet/Fleet";
import AllocationPage from "../../Pages/Allocation/AllocationPage";
import LoadingSlipPage from "../../Pages/VatAndDelivery/LoadingSlip";
import WeightScale1stWeightPage from "../../Pages/WeightScale/WeightScale1st";
import PackingPagesBulk from "../../Pages/VatAndDelivery/PackingEntryBulk";
import WeightScale2ndWeightPages from "../../Pages/WeightScale/WeightScale2nd";


const user = JSON.parse(
    fs.readFileSync("./tests/resources/User.json", "utf8")
);


test.describe("Sales Flow - Sales Order Bulk full process check", () => {

    // Important: dependent tests must run in order
    test.describe.configure({
        mode: "serial"
    });


    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.CCLLogin(
            user.pilotUsername,
            user.pilotPassword
        );

    });


    test("Create New SO Bulk", async ({ page }) => {

        const salesOrderPageBulk = new SalesOrderInputPageBulk(page);

        await salesOrderPageBulk.CCDLCreateSalesOrderBulk();

    });


    test("Create New Delivery Advice", async ({ page }) => {

        const deliveryAdvice = new DeliveryAdvicePage(page);

        await deliveryAdvice.createDeliveryAdvice();

    });

    test("Create New Fleet Entry ", async ({ page }) => {

        const fleet = new FleetPage(page);

        await fleet.createFleet();

    });

    test("Create New Allocation", async ({ page }) => {

        const allocationPage = new AllocationPage(page);

        await allocationPage.allocationEntryPage();

    });

    test("Create New Weight 1st", async ({ page }) => {

        const weightScalePage = new WeightScale1stWeightPage(page);

        await weightScalePage.weight1stEntryPage();

    });

    test("Create New Weight 2nd ", async ({ page }) => {

        const weightScale2ndPage = new WeightScale2ndWeightPages(page);

        await weightScale2ndPage.weight2ndEntryPage();

    });

    test("Create New Loading Slip ", async ({ page }) => {

        const loadingSlipPage = new LoadingSlipPage(page);

        await loadingSlipPage.enterLoadingInfo();

    });
    test("Create New Packing entry for Bag ", async ({ page }) => {

        const packingPagesBulk = new PackingPagesBulk(page);

        await packingPagesBulk.enterPackingInfoBulk();

    });

});

// npx playwright test tests/POM/SalesOrderBulkTest.spec.js