import { getAllocationNumber } from "../Utils/utility";

class PackingPagesBulk {
    constructor(page) {
        this.page = page;

        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.vatAndDeliveryMenu = page.locator("//a[@data-menu-xmlid='delivery_transport_conf.menu_delivery']");
        this.operationsMenu = page.locator("//button[@data-menu-xmlid='loading_and_packing.menu_vat_and_delivery_operation']");
        this.packingMenu = page.locator("//a[@data-menu-xmlid='loading_and_packing.menu_stock_delivery_packing']");

        this.createNewButton = page.locator(".btn-primary");

        this.selectAllocationNumber = page.locator("#allocation_number_id_0");
        // this.selectBagSupplier = page.locator("#bag_supplier_id_0");
        this.selectSiloNumber = page.getByRole('combobox', { name: 'Silo' });
        this.selectDeliveryPoint = page.getByRole('combobox', { name: 'Delivery Point' });
        this.selectLoadingOffice = page.locator("#loading_office_id_0");
        this.selectEngineer = page.locator("#engineer_id_0");

        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.packingDoneButton = page.locator("[name='action_set_packed']");
    }

    async enterPackingInfoBulk() {
        await this.homeMenu.click();
        await this.vatAndDeliveryMenu.click();
        await this.operationsMenu.click();
        await this.packingMenu.click();

        await this.createNewButton.nth(2).click();
        await this.selectAllocationNumber.fill(await getAllocationNumber());
        await this.page.waitForTimeout(2000);
        await this.selectAllocationNumber.press("Enter");
        await this.page.waitForTimeout(2000);



        await this.selectSiloNumber.click();
        await this.page.waitForTimeout(2000);
        await this.selectSiloNumber.press("Enter");
        await this.page.waitForTimeout(1000);



        await this.selectDeliveryPoint.click();
        await this.page.waitForTimeout(2000);
        await this.selectDeliveryPoint.press("Enter");
        await this.page.waitForTimeout(1000);



        // await this.selectBagSupplier.click();
        // await this.page.waitForTimeout(500);
        // await this.selectBagSupplier.press("Enter");


        await this.selectLoadingOffice.click();
        await this.page.waitForTimeout(500);
        await this.selectLoadingOffice.press("Enter");
        await this.page.waitForTimeout(500);

        await this.page.mouse.wheel(0, 500);



        await this.selectEngineer.click();
        await this.page.waitForTimeout(500);
        await this.selectEngineer.press("Enter");
        await this.page.waitForTimeout(500);


        await this.saveButton.click();
        await this.page.waitForTimeout(500);

        await this.packingDoneButton.click();
        await this.page.waitForTimeout(500);
    }
}

export default PackingPagesBulk;