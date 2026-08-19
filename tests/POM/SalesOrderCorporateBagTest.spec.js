import { test } from "@playwright/test";
import fs from "fs";

import LoginPage from "../../Pages/LoginPage";
import salesOrderCorporateInputPage from "../../Pages/Sales/Corporate/salesOrderCorporate";
import DeliveryAdviceCorporatePage from "../../Pages/Sales/Corporate/DeliveryAdviceCorporate";
import FleetPage from "../../Pages/Fleet/Fleet";
import AllocationPageCorporate from "../../Pages/Allocation/AllocationPageCorporate";
import LoadingSlipPage from "../../Pages/VatAndDelivery/LoadingSlip";
import WeightScale1stWeightPage from "../../Pages/WeightScale/WeightScale1st";
import PackingPagesBag from "../../Pages/VatAndDelivery/PackingEntry";
import WeightScale2ndWeightPages from "../../Pages/WeightScale/WeightScale2nd";


const user = JSON.parse(
    fs.readFileSync("./tests/resources/User.json", "utf8")
);


test.describe("Sales Flow - Sales Order Bag full process check", () => {

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


    test("Create New CorporateSO", async ({ page }) => {

        const salesOrderCorporatePage = new salesOrderCorporateInputPage(page);

        await salesOrderCorporatePage.CCDLCorporateCreateSalesOrder();

    });


    test("Create New Delivery Advice", async ({ page }) => {

        const deliveryAdviceCorporate = new DeliveryAdviceCorporatePage(page);

        await deliveryAdviceCorporate.createCorporateDeliveryAdvice();

    });

    test("Create New Fleet Entry ", async ({ page }) => {

        const fleet = new FleetPage(page);

        await fleet.createFleet();

    });


    test("Create New Allocation", async ({ page }) => {

        const allocationPageCorporate = new AllocationPageCorporate(page);

        await allocationPageCorporate.allocationEntryPageCorporate();

    });

    test("Create New Loading Slip ", async ({ page }) => {

        const loadingSlipPage = new LoadingSlipPage(page);

        await loadingSlipPage.enterLoadingInfo();

    });

    test("Create New Weight 1st", async ({ page }) => {

        const weightScalePage = new WeightScale1stWeightPage(page);

        await weightScalePage.weight1stEntryPage();

    });
    test("Create New Packing entry for Bag ", async ({ page }) => {

        const packingPagesBag = new PackingPagesBag(page);

        await packingPagesBag.enterPackingInfoBag();

    });

    test("Create New Weight 2nd ", async ({ page }) => {

        const weightScale2ndPage = new WeightScale2ndWeightPages(page);

        await weightScale2ndPage.weight2ndEntryPage();

    });

});

// npx playwright test tests/POM/SalesOrderCorporateBagTest.spec.js