// pages/WeightScale/WeightScale1stWeightPage.js

import { getAllocationNumber } from "../Utils/utility";

export class WeightScale1stWeightPage {
    constructor(page) {
        this.page = page;

        // Menus
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.weightScaleMainMenu = page.locator("//a[@data-menu-xmlid='weight_scale.weight_scale_root_menu']");
        this.weightScaleMenu = page.locator("//a[@data-menu-xmlid='weight_scale.weight_scale_menu']");
        this.weightMachineMenu = page.locator("//a[@data-menu-xmlid='weight_scale.weight_machine_menu']");

        // Buttons
        this.createNewButton = page.locator(".btn-primary");
        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.okButton = page.locator("//button[text()='Ok']");
        this.firstWeightSelectionButton = page.locator(".btn-primary");

        // Form
        this.allocationNumber = page.locator("#allocation_id_0");
        this.weightMachineNumber = page.locator("#weight_machine_id_0");

        // Weight Machine Page
        this.tableRowDataSelection = page.locator(".o_data_row");
        this.inputWeight = page.locator("#weight_0");
    }

    async weight1stEntryPage() {

        // Navigate
        await this.homeMenu.click();
        await this.weightScaleMainMenu.click();
        await this.weightScaleMenu.click();

        // Create New
        await this.createNewButton.nth(2).click();

        // Allocation
        await this.allocationNumber.fill(getAllocationNumber());
        await this.allocationNumber.press("Enter");
        await this.page.waitForTimeout(1000);

        // Weight Machine
        await this.weightMachineNumber.click();
        await this.page.waitForTimeout(1000);
        await this.weightMachineNumber.press("Enter");
        await this.page.waitForTimeout(1000);

        // Open Weight Machine in new tab
        const [machinePage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.weightMachineMenu.click({
                modifiers: ["Control"] // Use ["Meta"] on macOS
            })
        ]);

        await machinePage.waitForLoadState();

        // Machine Page
        await machinePage.locator(".o_data_row").first().click();

        await machinePage.locator("#weight_0").fill("1000");

        await machinePage
            .locator("//button[@data-tooltip='Save manually']")
            .click();

        await machinePage.close();

        // Back to original page
        await this.firstWeightSelectionButton.nth(2).click();
        await this.page.waitForTimeout(1000);

        await this.okButton.click();
        await this.page.waitForTimeout(1000);
    }
}

export default WeightScale1stWeightPage;