import { test } from "@playwright/test";
import fs from "fs";
import LoginPage from "../../Pages/LoginPage";
import SalesOrderInputPage from "../../Pages/Sales/salesOrder";

// ---------------- User Data ----------------
const user = JSON.parse(
    fs.readFileSync("./tests/resources/User.json", "utf8")
);


// ---------------- Configuration ----------------
const TOTAL_USERS = 4;


// ---------------- Report Storage ----------------
const loadTestResults = [];


// Run tests parallel
test.describe.configure({ mode: "parallel" });


test.describe("User Login With Valid creds", () => {


    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        // Pilot server login
        await loginPage.CCLLogin(
            user.testUsername,
            user.testPassword
        );

        // Test server login
        // await loginPage.CCLLogin(
        //     user.testUsername,
        //     user.testPassword
        // );

    });



    for (let i = 1; i <= TOTAL_USERS; i++) {


        test(`Create New SO - User ${i}`, async ({ page }) => {


            const start = new Date();

            let status = "PASS";
            let errorMessage = "-";


            try {


                const salesOrderPage =
                    new SalesOrderInputPage(page);


                await salesOrderPage.CCDLCreateSalesOrder();


            } catch (err) {


                status = "FAILED";
                errorMessage = err.message;


                throw err;


            } finally {


                const finish = new Date();


                const duration =
                    ((finish - start) / 1000).toFixed(2) + " sec";



                loadTestResults.push({

                    User: i,

                    StartTime:
                        start.toLocaleString(),

                    FinishTime:
                        finish.toLocaleString(),

                    Duration:
                        duration,

                    Status:
                        status,

                    Error:
                        errorMessage

                });


            }


        });


    }



});



// ---------------- Generate Report After All Tests ----------------

test.afterAll(async () => {


    console.log(
        "\n============== Load Test Summary =============="
    );


    console.table(loadTestResults);



    const totalUsers =
        loadTestResults.length;


    const passed =
        loadTestResults.filter(
            x => x.Status === "PASS"
        ).length;


    const failed =
        loadTestResults.filter(
            x => x.Status === "FAILED"
        ).length;



    console.log("-----------------------------------------------");

    console.log(`Total Users : ${totalUsers}`);

    console.log(`Passed      : ${passed}`);

    console.log(`Failed      : ${failed}`);

    console.log("-----------------------------------------------");



    fs.writeFileSync(
        "./loadTestReport.json",
        JSON.stringify(
            loadTestResults,
            null,
            2
        )
    );



    console.log(
        "\nReport Saved : loadTestReport.json"
    );


});

// npx playwright test tests/SalesTest/salesOrderLoadTest.spec.js