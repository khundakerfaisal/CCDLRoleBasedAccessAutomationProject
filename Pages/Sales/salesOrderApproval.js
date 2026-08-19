class salesOrderApprovalPage {
    constructor(page) {
        this.page = page;

        // Menus
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.salesMenu = page.locator("//a[@data-menu-xmlid='sale.sale_menu_root']");
        this.orderAllMenu = page.locator("//button[@data-menu-xmlid='party_config.all_admin_menus']");
        this.salesOrderMenu = page.locator("//a[@data-menu-xmlid='sales_order.menu_all_sale_order']");

        // Buttons
        // this.createButton = page.locator(".btn-primary").nth(2);
        // this.createButton = page.getByRole("button", { name: "New" });
        // this.saveAndClose = page.getByRole('button', { name: 'Save & Close' });
        // this.save = page.locator("button[data-tooltip='Save manually']");

        // Header fields
        // this.location = page.getByRole('combobox', { name: 'Location' });
        // this.customer = page.getByRole('combobox', { name: 'Customer' });
        // this.executive = page.getByRole('combobox', { name: 'Sales Executive' });

        this.searchBar = page.locator('button:has(i[title="Toggle Search Panel"])');
        this.salesAdminButton = page.getByRole('menuitemcheckbox', { name: 'S-Admin' });

        this.rowSelection = page.locator('tr.o_data_row').nth(0);

        // this.addLine = page.locator("text=Add a line").first();

        // // Modal
        // this.modal = page.locator("div.modal-content.o_form_view");

        // // Line fields
        // this.product = page.locator("#product_id_0");
        // this.subDistrict = page.locator("#sub_district_id_0");
        // this.transportType = page.locator("#transport_type_0");
        // this.bagType = page.locator("#bag_type_id_0");
        // this.deliveryType = page.locator("#delivery_type_0");
        // this.qtyBag = page.locator("#qty_in_bag_0");

        // this.addGridItem = page.locator(
        //     "//div[contains(@class,'modal-content')]//tbody[@class='ui-sortable']//a[normalize-space()='Add a line'][1]"
        // );

        // this.transportCapacity = page.locator("//div[@name='transport_capacity']//input");
        // this.breakdown = page.locator("//div[@name='break_down_no']//input");

        // // Actions
        // this.sendToAdmin = page.locator("[name='send_to_sales_admin']");
        // this.confirmButton = page.locator("[name='action_confirm']");

        // this.okButton = page.getByRole('button', { name: 'Ok' });
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


    async CCDLSalesOrderApproval() {


        // Open Sales Order

        await this.homeMenu.click();

        // await this.salesMenu.waitFor({ state: "visible" });
        await this.salesMenu.click();

        // await this.orderMenu.waitFor({ state: "visible" });
        await this.orderAllMenu.click();

        // await this.salesOrderMenu.waitFor({ state: "visible" });
        await this.salesOrderMenu.click();




        // Search

        await this.searchBar.click();
        await this.page.waitForTimeout(2000);
        await this.salesAdminButton.click();
        await this.page.waitForTimeout(2000);


        // await rowSelection.click();






        // Confirm

        await this.confirmButton.waitFor({
            state: "visible"
        });

        await this.confirmButton.click();
        await this.page.waitForTimeout(1000);



        // Final popup

        await this.okButton.waitFor({
            state: "visible"
        });

        await this.okButton.click();
        await this.page.waitForTimeout(1000);

    }
}


export default salesOrderApprovalPage;