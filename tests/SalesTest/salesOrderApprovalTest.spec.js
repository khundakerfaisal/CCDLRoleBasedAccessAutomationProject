import { test, chromium } from "@playwright/test";
import fs from "fs";

import LoginPage from "../../Pages/LoginPage";
import salesOrderApprovalPage from "../../Pages/Sales/salesOrderApproval";


const user = JSON.parse(
    fs.readFileSync("./tests/resources/User.json", "utf8")
);


// ===============================
// Load Test Configuration
// ===============================

const THREADS = 1;
const RAMP_UP = 10; // seconds
const LOOP = 1;


// Delay between users
const START_INTERVAL =
    (RAMP_UP * 1000) / THREADS;



// Store results
let results = [];



// Sleep function
function sleep(ms) {

    return new Promise(resolve => 
        setTimeout(resolve, ms)
    );

}




// ===============================
// Virtual User
// ===============================

async function virtualUser(browser, userNo) {


    const startTime = new Date();


    let status = "PASS";
    let errorMessage = "-";


    let context;



    try {


        context =
            await browser.newContext();


        const page =
            await context.newPage();



        console.log(
            `\n==============================`
        );

        console.log(
            `User ${userNo} Started`
        );

        console.log(
            `Start Time : ${startTime.toLocaleString()}`
        );


        console.log(
            `==============================`
        );



        const login =
            new LoginPage(page);



        await login.goto();



        await login.CCLLogin(
            user.testUsername,
            user.testPassword
        );



        const salesOrderApproval =
            new salesOrderApprovalPage(page);



        for(let i=0;i<LOOP;i++){


            console.log(
                `User ${userNo} -> Loop ${i+1}`
            );


            await salesOrderApproval.CCDLSalesOrderApproval();


        }



    }
    catch(error){


        status = "FAILED";


        errorMessage =
            error.message.substring(0,150);



        console.error(
            `User ${userNo} Failed`
        );


        console.error(
            errorMessage
        );



    }
    finally{


        const finishTime =
            new Date();



        const duration =
            (
                (finishTime-startTime)
                /1000
            )
            .toFixed(2);




        // Always save result

        results.push({


            User:userNo,


            StartTime:
                startTime.toLocaleString(),


            FinishTime:
                finishTime.toLocaleString(),


            Duration:
                `${duration} sec`,


            Status:status,


            Error:errorMessage



        });





        console.log(
            `User ${userNo} Finished`
        );


        console.log(
            `Status : ${status}`
        );



        if(context){

            await context.close();

        }


    }


}






// ===============================
// Main Load Test
// ===============================


test(
"Sales Order Load Test",
async()=>{


    console.log(
        "\n========== Load Test Started ==========\n"
    );



    console.log(
        `Threads     : ${THREADS}`
    );


    console.log(
        `Ramp-Up     : ${RAMP_UP} Seconds`
    );


    console.log(
        `Loop Count  : ${LOOP}`
    );


    console.log(
        `Start Delay : ${START_INTERVAL} ms`
    );




    const browser =
        await chromium.launch({

            headless:false,
            // headless:true,

            slowMo:0

        });




    const users = [];



    try{


        for(
            let i=1;
            i<=THREADS;
            i++
        ){



            console.log(
                `Launching User ${i}`
            );



            users.push(
                virtualUser(
                    browser,
                    i
                )
            );



            await sleep(
                START_INTERVAL
            );


        }




        // Wait for ALL users
        // even if some fail

        await Promise.allSettled(users);



    }
    finally{



        await browser.close();




        // ===============================
        // FINAL SUMMARY
        // ===============================



        console.log("\n");

        console.log(
            "============== Load Test Summary =============="
        );



        // Sort users

        results.sort(
            (a,b)=>
                a.User-b.User
        );




        const summary =
            results.map(x=>({


                User:x.User,


                StartTime:x.StartTime,


                FinishTime:x.FinishTime,


                Duration:x.Duration,


                Status:x.Status,


                Error:x.Error



            }));





        console.table(summary);






        const passed =
            summary.filter(
                x=>x.Status==="PASS"
            )
            .length;




        const failed =
            summary.filter(
                x=>x.Status==="FAILED"
            )
            .length;





        console.log(
            "-----------------------------------------------"
        );


        console.log(
            `Total Users : ${THREADS}`
        );


        console.log(
            `Completed   : ${summary.length}`
        );


        console.log(
            `Passed      : ${passed}`
        );


        console.log(
            `Failed      : ${failed}`
        );


        console.log(
            "-----------------------------------------------"
        );





        // Save JSON Report


        fs.writeFileSync(

            "loadTestReport.json",

            JSON.stringify(
                summary,
                null,
                4
            )

        );



        console.log(
            "\nReport Saved : loadTestReport.json"
        );



    }



});

// npx playwright test tests/SalesTest/salesOrderApprovalTest.spec.js