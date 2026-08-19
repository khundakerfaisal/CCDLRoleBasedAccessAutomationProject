class salesOrderInputPage {
    constructor(page) {
        this.page = page;

        // Menus
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.salesMenu = page.locator("//a[@data-menu-xmlid='sale.sale_menu_root']");
        this.orderMenu = page.locator("//button[@data-menu-xmlid='sale.sale_order_menu']");
        this.salesOrderMenu = page.locator("//a[@data-menu-xmlid='sales_order.menu_sale_order']");

        // Buttons
        // this.createButton = page.locator(".btn-primary").nth(2);
        this.createButton = page.getByRole("button", { name: "New" });
        this.saveAndClose = page.getByRole('button', { name: 'Save & Close' });
        this.save = page.locator("button[data-tooltip='Save manually']");

        // Header fields
        this.location = page.getByRole('combobox', { name: 'Location' });
        this.customer = page.getByRole('combobox', { name: 'Customer' });
        this.executive = page.getByRole('combobox', { name: 'Sales Executive' });

        this.addLine = page.locator("text=Add a line").first();

        // Modal
        this.modal = page.locator("div.modal-content.o_form_view");

        // Line fields
        this.product = page.locator("#product_id_0");
        this.subDistrict = page.locator("#sub_district_id_0");
        this.transportType = page.locator("#transport_type_0");
        this.bagType = page.locator("#bag_type_id_0");
        this.deliveryType = page.locator("#delivery_type_0");
        this.qtyBag = page.locator("#qty_in_bag_0");

        this.addGridItem = page.locator(
            "//div[contains(@class,'modal-content')]//tbody[@class='ui-sortable']//a[normalize-space()='Add a line'][1]"
        );

        this.transportCapacity = page.locator("//div[@name='transport_capacity']//input");
        this.breakdown = page.locator("//div[@name='break_down_no']//input");

        // Actions
        this.sendToAdmin = page.locator("[name='send_to_sales_admin']");
        this.confirmButton = page.locator("[name='action_confirm']");

        this.okButton = page.getByRole('button', { name: 'Ok' });
        this.addGridItemmodal = page.locator('.modal-content');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
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


    async CCDLCreateSalesOrder() {


        // Open Sales Order

        await this.homeMenu.click();

        await this.salesMenu.waitFor({ state: "visible" });
        await this.salesMenu.click();

        await this.orderMenu.waitFor({ state: "visible" });
        await this.orderMenu.click();

        await this.salesOrderMenu.waitFor({ state: "visible" });
        await this.salesOrderMenu.click();


        // Create

        await this.createButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.createButton.click();



        // Location

        await this.selectAutocomplete(
            this.location,
            "Main Store/Cement Plant Main Store"
        );

        // await this.selectAutocomplete(      //Cluster server
        //     this.location,
        //     "Main Store/Cement Plant"
        // );



        // Sales Executive

        await this.selectAutocomplete(
            this.executive,
            "Md. Zahid Hasan"
        );

        // await this.selectAutocomplete(//Cluster server
        //     this.executive,
        //     "Abdullah Al Maruf"
        // );



        // Customer

        await this.selectAutocomplete(
            this.customer,
            "credit Test"
        );


        // await this.selectAutocomplete(//Cluster server
        //     this.customer,
        //     "A J M Steel Corporation"
        // );



        // Scroll to lines

        await this.page.mouse.wheel(0, 1500);



        // Add product line

        await this.addLine.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.addLine.click();



        // Wait modal

        await this.modal.waitFor({
            state: "visible",
            timeout: 15000
        });



        // Product

        await this.product.waitFor({
            state: "visible"
        });


        await this.selectAutocomplete(
            this.product,
            "PCC Cement-(CEM II-AM)"
        );

        // await this.selectAutocomplete(//Cluster server
        //     this.product,
        //     "Composite Rajmistry"
        // );



        // Sub District

        await this.selectAutocomplete(
            this.subDistrict,
            "Narsingdi Sadar"
        );

        // await this.selectAutocomplete(//Cluster server
        //     this.subDistrict,
        //     "Kotwali"
        // );



        // Transport

        await this.transportType.waitFor({
            state: "visible"
        });

        await this.transportType.selectOption({
            label: "CNF Cost"
        });


        // await this.transportType.selectOption({//cluster server
        //     label: "CCL Cost"
        // });


        // Bag Type



        await this.selectAutocomplete(
            this.bagType,
            "CEM II AM 1 Ply"
        );


        // await this.selectAutocomplete(//cluster server
        //     this.bagType,
        //     "CEM II-AM 1 Ply "
        // );




        // Delivery

        await this.deliveryType.selectOption({
            label: "Regular"
        });



        // Quantity

        await this.qtyBag.fill("20");



        // Grid

        await this.addGridItem.scrollIntoViewIfNeeded();

        await this.addGridItem.click();



        await this.transportCapacity.fill("0.50");

        await this.breakdown.fill("2");



        // Save popup

        await this.saveAndClose.waitFor({
            state: "visible"
        });

        await this.saveAndClose.click();



        // Main save

        await this.save.waitFor({
            state: "visible"
        });

        await this.save.click();



        // Send Admin

        await this.sendToAdmin.waitFor({
            state: "visible"
        });

        await this.sendToAdmin.click();
        await this.page.waitForTimeout(1000);



        // Confirmation popup

        await this.okButton.waitFor({
            state: "visible"
        });

        await this.okButton.click();


        // Wait for modal to appear
        await this.page.waitForTimeout(1000);
        await this.addGridItemmodal.click();
        await this.page.waitForTimeout(1000);


        await this.continueButton.waitFor({
            state: "visible"
        });



        //click on continue button
        await this.continueButton.click();
        await this.page.waitForTimeout(1000);




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


export default salesOrderInputPage;