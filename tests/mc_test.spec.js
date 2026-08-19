import { test } from "@playwright/test";
const { chromium } = require("playwright");

// ---------------- Configuration ----------------
const TOTAL_USERS = 5;
const VISIBLE_BROWSERS = 1;

const BASE_URL = "https://mcstaging-connect.mimebd.com";
const USERNAME = "data.migration4";
const PASSWORD = "Livepass1234#";

// ---------------- Timeouts ----------------
const PAGE_TIMEOUT = 90000;
const LOGIN_TIMEOUT = 90000;

// ---------------- Metrics ----------------
let loginTimes = [];
let successCount = 0;
let failureCount = 0;

// ---------------- User Function ----------------
async function runUser(id, showBrowser) {
    const browser = await chromium.launch({
        headless: !showBrowser,
        slowMo: showBrowser ? 200 : 0
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    const start = Date.now();

    try {
        await page.goto(`${BASE_URL}/login`, {
            waitUntil: "domcontentloaded",
            timeout: PAGE_TIMEOUT
        });

        await page.waitForSelector("#username", { timeout: LOGIN_TIMEOUT });
        await page.waitForSelector("#password", { timeout: LOGIN_TIMEOUT });
        await page.waitForSelector("#login", { timeout: LOGIN_TIMEOUT });

        await page.fill("#username", USERNAME);
        await page.fill("#password", PASSWORD);

        await page.waitForSelector(".velmld-overlay", {
            state: "hidden",
            timeout: 60000
        }).catch(() => {});

        await Promise.all([
            page.click("#login"),
            page.waitForURL(url => !url.toString().includes("/login"), {
                timeout: LOGIN_TIMEOUT
            })
        ]);

        const duration = Date.now() - start;

        console.log(`User ${id}: SUCCESS in ${duration} ms`);

        loginTimes.push(duration);
        successCount++;
    } catch (err) {
        console.log(`User ${id}: FAILED -> ${err.message}`);
        failureCount++;
    } finally {
        await browser.close();
    }
}

// ---------------- Single Playwright Test ----------------
test("Concurrent Login Load Test", async () => {
    console.log(`Starting CONCURRENT test with ${TOTAL_USERS} users...\n`);

    // Reset metrics
    loginTimes = [];
    successCount = 0;
    failureCount = 0;

    const users = [];

    for (let i = 0; i < TOTAL_USERS; i++) {
        users.push(runUser(i + 1, i < VISIBLE_BROWSERS));
    }

    await Promise.all(users);

    console.log("\n=== CONCURRENT LOGIN TEST SUMMARY ===");
    console.log(`Total Users: ${TOTAL_USERS}`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failureCount}`);

    if (loginTimes.length) {
        const min = Math.min(...loginTimes);
        const max = Math.max(...loginTimes);
        const avg = Math.round(
            loginTimes.reduce((a, b) => a + b, 0) / loginTimes.length
        );

        console.log(`Min Login Time: ${min} ms`);
        console.log(`Max Login Time: ${max} ms`);
        console.log(`Avg Login Time: ${avg} ms`);
    }

    // Optional assertion
    // expect(successCount).toBe(TOTAL_USERS);
});