
import { generateRandomTinNumber, generateMobileNumber, generateAgentCustomer } from "../Utils/utility";


export class AgentCustomerPage {
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

        // Accounting Specific Fields
        this.accountingMenu = page.locator("//a[@data-menu-xmlid='account.menu_finance']");
        this.accountingConfigurationMenu = page.locator("//button[@data-menu-xmlid='account.menu_finance_configuration']");
        this.chartOfAccountMenu = page.locator("//a[@data-menu-xmlid='account.menu_action_account_form']");
        this.coaAccountName = page.locator("#name_0");
        this.accountTypeSelection = page.locator("#account_type_0");
        this.accountGroup = page.locator("#group_id_0");

        // Accounting Approval Buttons
        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.submitButton = page.locator("//button[@name='action_submit']");
        this.approveButton = page.locator("//button[@name='action_done']");

        // Customer Approval Button
        this.customerApprovalButton = page.locator("//button[@name='action_approve']");
    }

    async inputAgentCustomerInfo() {

        // Navigate to Home Menu
        await this.homeMenu.click();


        //Navigate to Sales
        await this.salesMenu.click();


        //Navigate to Sales->Configuration
        await this.configurationMenu.click();


        //Navigate to Sales->Configuration->Customer
        await this.customerSubMenu.click();


        // Click on the Create New button to create a new Agent customer
        await this.createNewButton.nth(2).click();



        // Create New Agent Customer Name
        const customerName = await generateAgentCustomer.generateAutoAgentCustomer();

        // Fill in the Customer Name
        await this.inputCustomer.fill(customerName);


        // Select Customer Type
        await this.selectCustomerType.selectOption({
            label: "Distributor/Dealer"
        });



        // Input Mobile Number
        await this.inputMobileNumber.fill(generateMobileNumber().toString());



        // -------------------------
        // Open Accounting in new tab
        // -------------------------



        // Click on the Home Menu
        await this.homeMenu.click();


        // Wait for the new page to open
        const pagePromise = this.page.context().waitForEvent("page");


        // Click on the Accounting Menu with middle button to open in new tab
        await this.accountingMenu.click({
            button: "middle"
        });

        // Wait for a short time to ensure the new tab is opened
        await this.page.waitForTimeout(1000);


        // Get the new page (tab) that was opened   
        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        //wait for a short time to ensure the new tab is fully loaded

        await newPage.waitForTimeout(500);

        // Navigate to Accounting->Configuration
        const accountingConfigurationMenu =
            newPage.locator("//button[@data-menu-xmlid='account.menu_finance_configuration']");


        //wait for a short time to ensure the menu is fully loaded  
        await newPage.waitForTimeout(500);


        // Navigate to Accounting->Configuration->Chart of Accounts
        const chartOfAccountMenu =
            newPage.locator("//a[@data-menu-xmlid='account.menu_action_account_form']");


        //Click on the Create button to create a new account   
        const createButton =
            newPage.locator(".btn-primary");



        //click on the Chart of Accounts configuration menu
        await accountingConfigurationMenu.click();



        //click on the Chart of Accounts menu
        await chartOfAccountMenu.click();


        //Create a new account by clicking on the Create button
        await createButton.nth(2).click();


        //Input the Account Name in the Chart of Accounts
        await newPage.locator("#name_0")
            .fill(customerName);


        //Select the Account Type as Receivable  
        await newPage.locator("#account_type_0")
            .selectOption({ label: "Receivable" });



        //wait for a short time to ensure the selection is made
        await newPage.waitForTimeout(500);


        //Select the Account Group as Dealer sales
        await newPage.locator("#group_id_0")
            .fill("Dealers sales");

        //wait for a short time to ensure the selection is made  
        await newPage.waitForTimeout(500);


        //Press Enter to confirm the selection of the Account Group
        await newPage.locator("#group_id_0")
            .press("Enter");

        //wait for a short time to ensure the selection is confirmed   
        await newPage.waitForTimeout(500);

        // Click on the Save button to save the new account
        await newPage.locator("//button[@data-tooltip='Save manually']")
            .click();

        // Click on the Submit button to submit the new account
        await newPage.locator("//button[@name='action_submit']")
            .click();

        // Click on the Done button to complete the process    
        await newPage.locator("//button[@name='action_done']")
            .click();
        // Close the new tab and switch back to the original page  
        await newPage.close();


        // -------------------------
        // Back to Customer Page
        // -------------------------



        //Select Brand
        await this.brandSelection.fill("Confidence");
        await this.brandSelection.press("Enter");


        //Select Sales Executive
        await this.inputSalesExecutive.fill("Md. Zahid Hasan");            //ccdl pilot server
        // await this.inputSalesExecutive.fill("Abdullah Al Maruf");          //ccdl Test server
        await this.page.waitForTimeout(500);
        await this.inputSalesExecutive.press("Enter");



        //Select Region

        await this.inputRegion.fill("Narsingdi Sadar");             //ccdl pilot server
        // await this.inputRegion.fill("CTG METRO");
        await this.inputRegion.press("Enter");



        //Select Marital Status
        await this.selectMaritalStatus.selectOption({
            label: "Married"
        });

        //Set Marriage Date to today's date
        const today = new Date().toISOString().split("T")[0];
        await this.marriageDate.fill(today);


        //wait for a short time to ensure the date is filled
        await this.page.waitForTimeout(2000);


        // Generate a random TIN number and fill it in the TIN field
        await this.page.waitForTimeout(500);


        //wait for a short time to ensure the TIN number is filled
        const tinNumber = generateRandomTinNumber();
        console.log("Generated TIN:", tinNumber);
        await this.inputTinNo.click();
        await this.inputTinNo.fill(String(tinNumber));
        await this.page.waitForTimeout(500);



        // Scroll down to make the Accounting tab visible
        await this.page.evaluate(() => {
            window.scrollBy(0, 1000);
        });


        //Select the Accounting tab to fill in the account head
        await this.accountingTabSwitch.nth(0).click();



        //wait for a short time to ensure the tab is selected
        await this.page.waitForTimeout(2000);


        // Fill in the Account Head with the corporate customer name
        await this.accountHead.fill(customerName);
        await this.accountHead.press("Enter");


        //Select the Accounting tab to fill in the  payment type
        await this.paymentTypeCheck.nth(2).click();
        await this.page.waitForTimeout(2000);


        // Scroll Up to make the Save button visible
        await this.page.evaluate(() => {
            window.scrollTo(0, 1000);
        });


        // Click on the Save button to save the new corporate customer
        await this.saveButton.click();


        // Click on the Customer Approval button to approve the new corporate customer
        await this.customerApprovalButton.click();
    }
}
export default AgentCustomerPage;


