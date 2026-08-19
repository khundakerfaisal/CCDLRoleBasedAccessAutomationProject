import { expect } from "@playwright/test";
import { generateRandomAmount } from "../Utils/utility";

class MoneyReceiptPage {
    constructor(page) {
        this.page = page;

        // Menu
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.salesMenu = page.locator("//a[@data-menu-xmlid='sale.sale_menu_root']");
        this.moneyReceiptMenu = page.getByRole("menuitem", { name: "Money Receipt" });

        // Buttons
        this.createButton = page.locator(".btn-primary").nth(2);
        this.saveButton = page.locator("[data-tooltip='Save manually']");
        this.confirmButton = page.locator("[name='send_to_sales_admin']");
        this.salesAdminButton = page.locator("[name='sales_admin_confirm']");
        this.approveButton = page.locator("[name='btn_approved']");

        // Form
        this.executive = page.getByRole("combobox", { name: "Sales Executive" });
        this.customer = page.getByRole("combobox", { name: "Customer" });
        this.depositedByCustomerCheckbox = page.getByRole("checkbox", { name: "Deposited By Customer" });
        this.depositeAmount = page.getByRole("textbox", { name: "Deposit Amount" });
        this.BankNameSelect = page.getByRole("combobox", { name: "Bank Name" });
        this.attachment = page.getByRole("button", { name: "Attach Attachments" });
    }

    async selectAutocomplete(field, value) {
        await field.click();
        await field.fill(value);

        const option = this.page
            .locator(".o-autocomplete--dropdown-item")
            .filter({ hasText: value })
            .first();

        await option.click();
    }

    async createMoneyReceipt() {
        // Navigate
        await this.homeMenu.click();
        await this.salesMenu.click();
        await this.moneyReceiptMenu.click();
        await this.createButton.click();

        // Sales Executive
        await this.page.waitForTimeout(1000);
        // await this.selectAutocomplete(this.executive, "Md. Zahid Hasan");
        await this.selectAutocomplete(this.executive, "Abdullah Al Maruf");
        await this.page.waitForTimeout(500);

        // Customer
        await this.selectAutocomplete(this.customer, "A J M Steel Corporation");
        await this.page.waitForTimeout(500);
        // Deposit
        await this.depositedByCustomerCheckbox.check();
        await this.depositeAmount.fill(generateRandomAmount().toString());
        await this.page.waitForTimeout(500);
        // Bank
        await this.selectAutocomplete(
            this.BankNameSelect,
            // "5081901000348 - Pubali Bank PLC - Hotel Intercontinental"
            "CD-00933006428 - Bank Asia PLC - Agrabad"
        );
        await this.page.waitForTimeout(500);

        // Attachment
        const fileChooserPromise = this.page.waitForEvent("filechooser");
        await this.attachment.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("tests/resources/Screenshot.png");

        // Save
        await this.saveButton.click();

        // Send to Sales Admin
        await expect(this.confirmButton).toBeEnabled();
        await this.confirmButton.click();

        // Sales Admin Confirmation (CLICK ONLY ONCE)
        await expect(this.salesAdminButton).toBeEnabled({
            timeout: 30000,
        });
        await this.salesAdminButton.click();

        // Wait until workflow changes
        await expect(this.approveButton).toBeEnabled({
            timeout: 60000,
        });

        // Approve
        await this.approveButton.click();
    }
}

export default MoneyReceiptPage;