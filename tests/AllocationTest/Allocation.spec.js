import { test, expect } from "@playwright/test";
import fs from "fs";
import LoginPage from "../../Pages/LoginPage";
import AllocationPage from "../../Pages/Allocation/AllocationPage";

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

        test(`Create New Allocation  - ${i}`, async ({ page }) => {

            const allocationPage = new AllocationPage(page);

            await allocationPage.allocationEntryPage();

        });

    }

});

//npx playwright test tests/AllocationTest/Allocation.spec.js --workers=3