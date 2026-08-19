const { getAllocationNumber } = require("../../Pages/Utils/utility");

class LoadingSlipDepotPage {
    constructor(page) {
        this.page = page;

        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.vatAndDeliveryMenu = page.locator("//a[@data-menu-xmlid='delivery_transport_conf.menu_delivery']");
        this.operationsMenu = page.locator("//button[@data-menu-xmlid='loading_and_packing.menu_vat_and_delivery_operation']");
        this.loadingSlipMenu = page.locator("//a[@data-menu-xmlid='loading_and_packing.menu_loading_slip']");

        this.createNewButton = page.locator(".btn-primary");

        this.selectAllocationNumber = page.locator("#allocation_id_0");
        this.selectGiftItem = page.locator("#gift_product_id_0");
        this.selectSiloNumber = page.locator("#silo_ids_0");

        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.submitButton = page.locator("[name='action_done']");
    }

    async enterLoadingInfoDepot() {

        await this.homeMenu.click();

        await this.vatAndDeliveryMenu.click();

        await this.operationsMenu.click();

        await this.loadingSlipMenu.click();

        // Equivalent to createNewButton.get(2).click() in Selenium
        await this.createNewButton.nth(2).click();

        await this.selectAllocationNumber.fill(getAllocationNumber());

        // Select the dropdown value
        await this.selectAllocationNumber.press("Enter");
        await this.page.waitForTimeout(1000);

        // Uncomment if needed
        // await this.selectSiloNumber.press("Backspace");

        await this.saveButton.click();
        await this.page.waitForTimeout(1000);

        await this.submitButton.click();
        await this.page.waitForTimeout(1000);
    }
}

export default LoadingSlipDepotPage;