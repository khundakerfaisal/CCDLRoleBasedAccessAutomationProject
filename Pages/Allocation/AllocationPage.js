import { AllocationNumber } from "../Utils/utility";

class AllocationPage {
    constructor(page) {
        this.page = page;

        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.allocationMenu = page.locator(
            "//a[@data-menu-xmlid='transport_delivery.allocation_number_parent_menu']"
        );
        this.vehicleAllocationMenu = page.locator(
            "//a[@data-menu-xmlid='transport_delivery.allocation_number_menu']"
        );

        this.createNewButton = page.locator(".btn-primary");

        this.inputTripType = page.locator("#trip_type_id_0");
        this.inputTransportType = page.locator("#transport_type_0");

        this.selectVehicle = page.getByRole('combobox', {
            name: 'Vehicle'
        });

        this.inputCustomer = page.getByRole('combobox', {
            name: 'Partner'
        });

        this.inputDeliveryAdvice = page.getByRole('combobox', {
            name: 'Delivery Advise'
        });

        this.saveButton = page.locator(
            "//button[@data-tooltip='Save manually']"
        );

        this.submitButton = page.locator("[name='action_submit']");

        this.allocationNumber = page.locator("//div[@name='name']//span");
    }


    async selectAutocomplete(field, value) {

        await field.waitFor({
            state: "visible"
        });

        await field.click();

        await field.fill(value);


        const option = this.page
            .locator(".o-autocomplete--dropdown-item")
            .filter({ hasText: value })
            .first();


        await option.waitFor({
            state: "visible",
            timeout: 15000
        });


        await option.click();

    }


    // Vehicle selection fix
    async selectVehicleOption() {

        await this.selectVehicle.waitFor({
            state: "visible",
            timeout: 10000
        });


        await this.selectVehicle.click();


        // Trigger dropdown
        await this.selectVehicle.fill("");


        const vehicleOption = this.page
            .locator(".o-autocomplete--dropdown-item")
            .first();


        await vehicleOption.waitFor({
            state: "visible",
            timeout: 15000
        });


        await vehicleOption.click();

    }



    async allocationEntryPage() {

        await this.homeMenu.click();

        await this.allocationMenu.click();

        await this.vehicleAllocationMenu.click();


        await this.createNewButton
            .nth(2)
            .click();



        // Trip Type
        await this.inputTripType.fill("Sales");
        await this.inputTripType.press("Enter");



        // Transport Type
        await this.inputTransportType.selectOption({
            label: "CNF Cost",
        });



        // Customer
        await this.selectAutocomplete(
            this.inputCustomer,
            "credit Test"
        );



        // Delivery Advice
        await this.selectAutocomplete(
            this.inputDeliveryAdvice,
            "DA"
        );


        await this.page.mouse.wheel(0, 500);
        await this.selectVehicle.scrollIntoViewIfNeeded();

        // Vehicle
        await this.selectVehicleOption();



        // Save
        await this.saveButton.click();
        await this.page.waitForTimeout(500);




        const allocationNo = (
            await this.allocationNumber.textContent()
        ).trim();

        await this.page.waitForTimeout(2000);


        await AllocationNumber.saveAllocationNumber(allocationNo);

        await this.page.waitForTimeout(1000);


        await this.submitButton.click();
        await this.page.waitForTimeout(500);


    }
}


export default AllocationPage;