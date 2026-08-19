class DeliveryAdvicePageBulk {
    constructor(page) {
        this.page = page;

        // Menu
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.salesMenu = page.locator("//a[@data-menu-xmlid='sale.sale_menu_root']");
        this.orderMenu = page.locator("//button[@data-menu-xmlid='sale.sale_order_menu']");
        this.deliveryAdviceMenu = page.locator("//a[@data-menu-xmlid='sales_order.menu_delivery_advise']");

        // Buttons
        this.createButton = page.locator(".btn-primary").nth(2);
        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.requestApproveButton = page.locator("[name='action_request_approve']");
        this.approveButton = page.locator("//button[@name='action_submit']//span[text()='Approve']/..");

        // Form
        this.location = page.locator("#location_id_0");
        this.deliveryAddress = page.locator("#delivery_address_0");
        this.labourOffice = page.locator("#labor_office_0");
        this.customer = page.locator("input[placeholder='Select Customer']");
        this.executive = page.getByRole('combobox', { name: 'Sales Executive' });

        // DO Line
        this.addLine = page.getByText("Add a line", { exact: true });
        this.doLine = page.locator("[name='do_line_id']");
        this.doInput = page.locator("//td[@name='do_line_id']//input");

        // Site buttons
        this.addSiteButtons = page.locator("button[name='action_open_retailer_popup']");
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


    // ==============================
    // DO Line Selection Fix
    // ==============================
    async selectDeliveryOrder() {

        // Add new DO line
        await this.addLine.click();

        // Always get the currently active DO input
        const input = this.page
            .locator("//td[@name='do_line_id']//input")
            .last();

        await input.waitFor({
            state: "visible",
            timeout: 10000
        });

        await input.click();

        await input.fill("DO");

        // Wait for Odoo dropdown
        const dropdownOption = this.page
            .locator("ul.ui-autocomplete li")
            .filter({ hasText: "DO" })
            .first();

        await dropdownOption.waitFor({
            state: "visible",
            timeout: 10000
        });

        await dropdownOption.click();

        // Wait until value is populated
        await this.page.waitForTimeout(1000);
    }



    async createDeliveryAdvice() {

        // Navigate
        await this.homeMenu.click();
        await this.salesMenu.click();
        await this.orderMenu.click();
        await this.deliveryAdviceMenu.click();

        await this.createButton.click();



        // Location
        await this.selectAutocomplete(
            this.location,
            "Main Store/Cement Plant Main Store"
        );


        // Delivery Address
        await this.deliveryAddress.fill("Chittagong");


        // Labour Office
        await this.labourOffice.selectOption({
            label: "Labor Office"
        });



        // Customer
        await this.selectAutocomplete(
            this.customer,
            "credit Test"
        );


        // Sales Executive
        await this.selectAutocomplete(
            this.executive,
            "Md. Zahid Hasan"
        );



        // Scroll to DO section
        await this.page.mouse.wheel(0, 1000);



        // ============================
        // DO Line 1
        // ============================
        await this.selectDeliveryOrder();



        // ============================
        // DO Line 2
        // ============================
        await this.selectDeliveryOrder();



        // Save
        await this.saveButton.click();



        // Site Information
        await this.fillSiteInformation(0, false);

        await this.fillSiteInformation(1, true);



        // Approval
        await this.requestApproveButton.click();


        await this.approveButton.waitFor({
            state: "visible"
        });
        await this.page.waitForTimeout(500);

        await this.approveButton.click();
        await this.page.waitForTimeout(1000);
    }



    //Site information button click and select retailer from the list

    async fillSiteInformation(index, selectSecond) {

        const button = this.addSiteButtons.nth(index);

        // await button.scrollIntoViewIfNeeded();
        await button.click();

        const modal = this.page.locator(".modal-content");

        await modal.waitFor({
            state: "visible",
            timeout: 10000
        });

        const retailerCell = modal.locator("//td[@name='retailer_id']");
        await retailerCell.click();

        const retailerInput = modal.locator(
            "//td[@name='retailer_id']//input"
        );

        await retailerInput.waitFor({
            state: "visible",
            timeout: 10000
        });


        await retailerInput.click();

        // Give Odoo autocomplete time to initialize
        await this.page.waitForTimeout(500);


        if (selectSecond) {
            await retailerInput.fill("");
            await retailerInput.press("ArrowDown");
        } else {
            await retailerInput.fill("");
        }


        // Wait for autocomplete list
        const retailerOption = this.page
            .locator(".o-autocomplete--dropdown-item")
            .first();

        await retailerOption.waitFor({
            state: "visible",
            timeout: 10000
        });


        if (selectSecond) {
            await this.page
                .locator(".o-autocomplete--dropdown-item")
                .nth(1)
                .click();
        } else {
            await retailerOption.click();
        }


        const saveClose = modal.locator(
            "button[name='action_confirm']"
        );

        await saveClose.waitFor({
            state: "visible",
            timeout: 10000
        });

        await saveClose.click();


        await modal.waitFor({
            state: "hidden",
            timeout: 10000
        });
    }
}


export default DeliveryAdvicePage;

