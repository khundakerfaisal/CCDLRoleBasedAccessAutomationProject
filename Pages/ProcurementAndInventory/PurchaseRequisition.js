class PurchaseRequisition {
    constructor(page) {
        this.page = page;

        // Use title attribute to locate Home Menu button
        this.defaultRootMenu = page.getByTitle('Home Menu');

        // Purchase menu remains the same
        this.purchaseMenu = page.getByRole('menuitem', { name: 'Purchase' });
        this.orderRootMenu = page.getByRole('button', { name: 'Orders' })
        this.purchaseRequestSubMenu = page.getByRole('menuitem', { name: 'Purchase Requisition' })
        this.createNewPR = page.getByRole('button', { name: 'New' })
        this.selectPriority = page.getByLabel('Priority')
        this.selectDepartment = page.getByRole('textbox', { name: 'Department' })
        this.selectBudget = page.locator('#budget_id_0')
        // this.selectBudgetDropdown = page.locator('.o_dropdown_button')
        this.selectBudgetChoose = page.locator('.o-autocomplete--dropdown-item')
        this.selectRequestType = page.getByRole('combobox', { name: 'Requisition Type' })
        this.selectPRType = page.getByRole('combobox', { name: 'PR Type' })
        this.selectAddLine = page.getByRole('button', { name: 'Add a line' })

        // this.selectProductLine = page.getByRole('row', { name: 'Sub Parent budget - Budget' }).getByRole('combobox').first()
        this.selectProductLine = page.locator('.o_data_cell').first()
        this.prProducts = page.locator('.o-autocomplete--dropdown-item')
        this.prQty = page.locator('td[name="product_qty"] input.o_input');
        this.prSave = page.getByRole('button', { name: 'Save manually' })
        this.prSubmit = page.getByRole('button', { name: 'Submit' })
        this.prHoDApprove = page.getByRole('button', { name: 'Approve' })
        this.prGMApprove = page.getByRole('button', { name: 'Approve' })
    }

    async CCLPurchaseRequisition() {
        await this.defaultRootMenu.click();
        await this.purchaseMenu.click();
        await this.orderRootMenu.click();
        await this.purchaseRequestSubMenu.click();
        await this.createNewPR.click();
        await this.selectPriority.click();
        await this.page.keyboard.press('ArrowUp');    // move selection up
        await this.page.keyboard.press('ArrowUp');    // move selection up
        await this.page.keyboard.press('Enter');      // confirm selection

        // Department selection
        await this.selectDepartment.click();
        await this.page.waitForTimeout(2000); // Wait for dropdown to load
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter'); 



        // Budget selection
        await this.selectBudget.click();
        await this.page.waitForTimeout(2000); // Wait for field to be ready
        // await this.selectBudgetDropdown.click();
        await this.page.waitForSelector('.o-autocomplete--dropdown-item', { state: 'visible', timeout: 10000 });
        await this.selectBudgetChoose.first().click();
        await this.page.waitForTimeout(1000); // Wait for selection to complete

        // Request Type selection
        await this.selectRequestType.click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);

        // PR Type selection
        await this.selectPRType.click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);

        // Add product line
        await this.selectAddLine.click();
        await this.page.waitForTimeout(1000); // Wait for row to be added
        
        // Select product
        await this.selectProductLine.click();
        // await this.page.waitForTimeout(1000);
        await this.page.waitForSelector('.o-autocomplete--dropdown-item', { state: 'visible', timeout: 10000  });
         await this.page.waitForTimeout(1000);
        await this.prProducts.first().click();
        await this.page.waitForTimeout(1000); // Wait for product selection to complete
        // Fill quantity and save
        await this.prQty.fill('4');
        await this.page.waitForTimeout(1000);
        
        // Save the requisition
        await this.prSave.click();
        await this.page.waitForTimeout(1000); // Wait for save to complete
        
        // Submit for approval
        await this.prSubmit.click();
        await this.page.waitForTimeout(1000);
        
        // Approve by HoD
        await this.prHoDApprove.click();
        await this.page.waitForTimeout(1000);
        
        // Approve by GM
        await this.prGMApprove.click();
        await this.page.waitForTimeout(1000);
        // await this.page.pause();
    }
}

export default PurchaseRequisition;
