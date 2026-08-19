import { test } from "@playwright/test";
import fs from "fs";

import LoginPage from "../../Pages/LoginPage";
import SalesOrderDepotPage from "../../Pages/Depot/salesOrderDepot";
import DeliveryAdviceDepotPage from "../../Pages/Depot/DeliveryAdviceDepot";
import FleetDepotPage from "../../Pages/Depot/FleetDepot";
import AllocationPage from "../../Pages/Allocation/AllocationPage";
import LoadingSlipDepotPage from "../../Pages/Depot/LoadingSlipDepot";
import PackingPagesBag from "../../Pages/VatAndDelivery/PackingEntry";


const user = JSON.parse(
    fs.readFileSync("./tests/resources/User.json", "utf8")
);


test.describe("Sales Flow - Sales Order Depot Bag full process check", () => {

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


    test("Create New SO", async ({ page }) => {

        const salesOrderPage = new SalesOrderDepotPage(page);

        await salesOrderPage.CCDLCreateSalesOrderDepot();

    });


    test("Create New Delivery Advice", async ({ page }) => {

        const deliveryAdviceDepot = new DeliveryAdviceDepotPage(page);

        await deliveryAdviceDepot.createDeliveryAdviceDepot();

    });

    test("Create New Fleet Entry ", async ({ page }) => {

        const fleet = new FleetDepotPage(page);

        await fleet.createDepotFleet();

    });


    test("Create New Allocation", async ({ page }) => {

        const allocationPage = new AllocationPage(page);

        await allocationPage.allocationEntryPage();

    });

    test("Create New Loading Slip ", async ({ page }) => {

        const loadingSlipPage = new LoadingSlipDepotPage(page);

        await loadingSlipPage.enterLoadingInfoDepot();

    });

});

// npx playwright test tests/POM/DepotSalesTest.spec.js