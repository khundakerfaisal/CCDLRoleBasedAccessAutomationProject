import { generateNumber } from "../Utils/utility";

class FleetPage {

    constructor(page) {
        this.page = page;

        // Menu locators
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.fleetMenu = page.locator("//a[@data-menu-xmlid='fleet.menu_root']");
        this.fleetMainMenu = page.locator("//button[@data-menu-xmlid='fleet.fleet_vehicles']");
        this.fleetSubMenu = page.locator("//a[@data-menu-xmlid='fleet.fleet_vehicle_menu']");

        // Create button
        this.createNewButton = page.locator(".btn-primary");

        // Form fields
        this.modelName = page.locator("//input[@id='model_id_0']");
        this.licensePlate = page.locator("//input[@id='license_plate_0']");
        this.vehicleType = page.locator("//input[@id='tag_ids_0']");
        this.location = page.locator("//input[@id='location_id_0']");
        this.vehicleName = page.locator("//input[@id='vehicle_name_0']");
        this.vehicleCode = page.locator("//input[@id='vehicle_code_0']");
        this.driverName = page.locator("//input[@id='driver_id_0']");
        this.helperName = page.locator("//input[@id='helper_id_0']");

        // Buttons
        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.confirmButton = page.locator("//button[@name='button_confirm']");
    }

    async selectAutocomplete(field, value) {

        await field.waitFor({ state: "visible" });

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

    async createFleet() {


        await this.homeMenu.click();

        await this.fleetMenu.click();

        await this.fleetMainMenu.click();

        await this.fleetSubMenu.press("ArrowDown");
        await this.fleetSubMenu.press("Enter");


        // Click Create
        await this.createNewButton.nth(2).click();


        // Model
        await this.page.waitForTimeout(500);

        await this.modelName.click();
        await this.page.waitForTimeout(1500);
        await this.modelName.fill("Audi/A1");
        await this.page.waitForTimeout(1000);
        await this.modelName.press("Enter");


        // License Plate
        await this.licensePlate.fill(generateNumber());


        // Vehicle Type
        await this.vehicleType.click();
        await this.vehicleType.fill("Mini Truck");
        await this.vehicleType.press("Enter");


        // Location
        await this.location.click();

        await this.selectAutocomplete(
            this.location,
            "Main Store/Cement Plant Main Store"
        );

        // await this.location.fill(
        //     "Main Store/Cement Plant Main Store"
        // );
        await this.location.press("Enter");


        // Vehicle Information
        await this.vehicleName.fill("Audi/A1");

        await this.vehicleCode.fill(
            "Audi/A1/2021"
        );


        // Scroll down
        await this.page.mouse.wheel(0, 1000);
        await this.page.mouse.wheel(0, 1000);
        await this.page.mouse.wheel(0, 1000);


        // Driver

        await this.selectAutocomplete(
            this.driverName,
            "Md Mohabbat Ali"
        );



        // Helper
        await this.selectAutocomplete(
            this.helperName,
            "Abdul khalek"
        );



        // Scroll up
        await this.page.mouse.wheel(0, -1000);
        await this.page.mouse.wheel(0, -1000);
        await this.page.mouse.wheel(0, -1000);


        // Save
        await this.saveButton.click();

        await this.confirmButton.click();

    }
}

export default FleetPage;