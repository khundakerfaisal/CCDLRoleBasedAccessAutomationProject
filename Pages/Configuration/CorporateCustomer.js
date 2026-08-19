import { generateRandomTinNumber, generateMobileNumber, generateCorporateCustomer } from "../Utils/utility";

export class CorporateCustomerPage {
    constructor(page, context) {
        this.page = page;
        this.context = context;

        // Menus
        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.salesMenu = page.locator("//a[@data-menu-xmlid='sale.sale_menu_root']");
        this.configurationMenu = page.locator("//button[@data-menu-xmlid='sale.menu_sale_config']");
        this.customerSubMenu = page.locator("//a[@data-menu-xmlid='sales_config.customer_menu']");

        // Customer
        this.createNewButton = page.locator(".btn-primary");
        this.inputCustomer = page.locator("#name_0");
        this.inputMobileNumber = page.locator("#mobile_0");
        this.selectCustomerType = page.locator("#customer_type_0");

        // Accounting
        this.accountingMenu = page.locator("//a[@data-menu-xmlid='account.menu_finance']");
        this.accountingConfigurationMenu = page.locator("//button[@data-menu-xmlid='account.menu_finance_configuration']");
        this.chartOfAccountMenu = page.locator("//a[@data-menu-xmlid='account.menu_action_account_form']");

        this.coaAccountName = page.locator("#name_0");
        this.accountTypeSelection = page.locator("#account_type_0");
        this.accountGroup = page.locator("#group_id_0");

        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.submitButton = page.locator("//button[@name='action_submit']");
        this.approveButton = page.locator("//button[@name='action_done']");

        this.brandSelection = page.locator("#brand_id_attribute_0");
        this.inputEmail = page.locator("#email_0");

        this.inputRegion = page.locator("#sales_region_id_0");
        this.inputTinNo = page.locator("#tin_no_0");


        this.selectMaritalStatus = page.locator("#marital_status_0");
        this.marriageDate = page.locator("#marriage_date_0");

        this.inputSalesExecutive = page.locator("#sales_executive_user_ids_0");

        this.paymentTypeCheck = page.locator(".form-check-label");
        this.accountingTabSwitch = page.locator(".nav-item");

        this.accountHead = page.locator("#party_account_head_0");

        // this.groupName = page.getByRole("combobox", { name: "Group" });

        this.customerApprovalButton = page.locator("//button[@name='action_approve']");
    }

    async inputCorporateCustomerInfo() {

        // Navigate
        await this.homeMenu.click();
        await this.salesMenu.click();
        await this.configurationMenu.click();
        await this.customerSubMenu.click();

        await this.createNewButton.nth(2).click();
        await this.page.waitForTimeout(1000);

        // Customer Name
        const corporateCustomerName = await generateCorporateCustomer.generateAutoCorporateCustomer();

        await this.inputCustomer.fill(corporateCustomerName);

        // Customer Type
        await this.selectCustomerType.selectOption({
            label: "Corporate Customer"
        });

        // Mobile
        await this.inputMobileNumber.fill(generateMobileNumber().toString());

        // -------------------------
        // Open Accounting in new tab
        // -------------------------

        await this.homeMenu.click();
        const pagePromise = this.page.context().waitForEvent("page");

        await this.accountingMenu.click({
            button: "middle"
        });

        await this.page.waitForTimeout(1000);

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        await newPage.waitForTimeout(500);


        // Accounting locators
        const accountingConfigurationMenu =
            newPage.locator("//button[@data-menu-xmlid='account.menu_finance_configuration']");

        await newPage.waitForTimeout(500);

        const chartOfAccountMenu =
            newPage.locator("//a[@data-menu-xmlid='account.menu_action_account_form']");

        const createButton =
            newPage.locator(".btn-primary");

        await accountingConfigurationMenu.click();
        await chartOfAccountMenu.click();
        await createButton.nth(2).click();

        await newPage.locator("#name_0")
            .fill(corporateCustomerName);

        await newPage.locator("#account_type_0")
            .selectOption({ label: "Receivable" });


        await newPage.waitForTimeout(500);

        await newPage.locator("#group_id_0")
            .fill("Corporate sales");

        await newPage.waitForTimeout(500);

        await newPage.locator("#group_id_0")
            .press("Enter");

        await newPage.waitForTimeout(500);

        await newPage.locator("//button[@data-tooltip='Save manually']")
            .click();

        await newPage.locator("//button[@name='action_submit']")
            .click();

        await newPage.locator("//button[@name='action_done']")
            .click();

        await newPage.close();

        // -------------------------
        // Back to Customer Page
        // -------------------------

        // await this.brandSelection.fill("Confidence");
        // await this.brandSelection.press("Enter");

        await this.inputSalesExecutive.fill("Md. Zahid Hasan");            //ccdl pilot server
        // await this.inputSalesExecutive.fill("Abdullah Al Maruf");          //ccdl Test server
        await this.page.waitForTimeout(500);
        await this.inputSalesExecutive.press("Enter");

        await this.inputRegion.fill("Narsingdi Sadar");             //ccdl pilot server
        // await this.inputRegion.fill("CTG METRO");
        await this.inputRegion.press("Enter");

        // await this.page.evaluate(() => {
        //     window.scrollTo(0, 1000);
        // });

        await this.page.waitForTimeout(500);



        await this.selectMaritalStatus.selectOption({
            label: "Married"
        });


        const today = new Date().toISOString().split("T")[0];

        await this.marriageDate.fill(today);

        await this.page.waitForTimeout(2000);


        const tinNumber = generateRandomTinNumber();
        console.log("Generated TIN:", tinNumber);
        await this.inputTinNo.click();
        await this.inputTinNo.fill(String(tinNumber));
        await this.page.waitForTimeout(500);

        

        await this.page.evaluate(() => {
            window.scrollBy(0, 1000);
        });

        await this.accountingTabSwitch.nth(0).click();
        await this.page.waitForTimeout(2000);

        await this.accountHead.fill(corporateCustomerName);
        await this.accountHead.press("Enter");

        await this.paymentTypeCheck.nth(2).click();
        await this.page.waitForTimeout(2000);

        await this.page.evaluate(() => {
            window.scrollTo(0, 1000);
        });

        await this.saveButton.click();
        await this.page.waitForTimeout(2000);

        await this.customerApprovalButton.click();
    }
}
export default CorporateCustomerPage;