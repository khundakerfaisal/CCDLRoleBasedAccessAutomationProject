import { test, expect } from "@playwright/test"
import LoginPage from "../Pages/LoginPage"

test("User Login With Valid Cred", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL("http://192.168.3.187:7071/web/login");
    // await loginPage.CCLLogin("Admin", "1234");
    await loginPage.CCLLogin("devops", "@Dev2025");

    // await expect(page.getByText("SMS API Configuration")).toBeVisible();

})