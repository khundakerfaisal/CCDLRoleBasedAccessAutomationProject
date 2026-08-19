import { test, expect } from "@playwright/test";
import fs from "fs";
import LoginPage from "../../Pages/LoginPage";
import DeliveryAdvicePage from "../../Pages/Sales/DeliveryAdvice";

const user = JSON.parse(
    fs.readFileSync("./tests/resources/User.json", "utf8")
);

test.describe.configure({ mode: "parallel" });

test.describe("User Login With Valid creds", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.CCLLogin(user.pilotUsername, user.pilotPassword);         // Use this line for pilot server login
        // await loginPage.CCLLogin(user.testUsername, user.testPassword);             // Use this line for test server login
    });


    for (let i = 1; i <= 1; i++) {

        test(`Create New Delivery Advice - ${i}`, async ({ page }) => {

            const deliveryAdvice = new DeliveryAdvicePage(page);

            await deliveryAdvice.createDeliveryAdvice();

        });

    }

});

//npx playwright test tests/SalesTest/DeliveryAdvice.spec.js --workers=3