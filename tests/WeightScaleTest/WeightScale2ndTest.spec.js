import { test, expect } from "@playwright/test";
import fs from "fs";
import LoginPage from "../../Pages/LoginPage";
import  WeightScale2ndWeightPages  from "../../Pages/WeightScale/WeightScale2nd";

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

        test(`Create New Weight 2nd - ${i}`, async ({ page }) => {

            const weightScale2ndPage = new WeightScale2ndWeightPages(page);

            await weightScale2ndPage.weight2ndEntryPage();

        });

    }

});

//npx playwright test tests/WeightScaleTest/WeightScale2ndTest.spec.js --workers=3