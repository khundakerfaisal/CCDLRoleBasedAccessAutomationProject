import fs from 'fs';

class LoginPage {
    constructor(page) {
        this.page = page;

        this.userNameInput = page.getByRole("textbox", { name: "Email" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.clickButton = page.getByRole("button", { name: "Log in" });

        // Read URL from JSON file
        const data = JSON.parse(
            fs.readFileSync('./tests/resources/LoginUrl.json', 'utf8')
        );

        this.loginUrl = data.PilotloginUrl;               // Use this line for pilot server login
        this.loginUrl = data.CCDLTestloginUrl;               // Use this line for CCDL server login

        // this.loginUrl = data.TestloginUrl;            // Use this line for test server login
        // this.loginUrl = data.TestloginClusterUrl;            // Use this line for test server login
    }

    async goto() {
        await this.page.goto(this.loginUrl);
    }

    async CCLLogin(username, password) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.clickButton.click();
    }
}

export default LoginPage;