class LocalPoPage {
    constructor(page) {
        this.page = page;
        this.defaultRootMenu = page.getByTitle('Home Menu');
        this.purchaseMenu = page.getByRole('menuitem', { name: 'Purchase' });
        this.orderRootMenu = page.getByRole('button', { name: 'Orders' })
        this.localPoSubMenu = page.getByRole('menuitem', { name: 'Local Purchase' })
        // this.localPoFirstItem = page.locator('.o_data_row').first()
        this.createNewLocalPo = page.getByRole('button', { name: 'New' })
        this.selectPurchaseBase = page.getByRole('combobox', { name: 'Purchase Base' })
        this.selectCS = page.getByRole('textbox', { name: 'CS' })
        this.selectSupplier = page.getByRole('textbox', { name: 'Supplier' })
         this.saveButton = page.getByRole('button', { name: 'Save' })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' })


    }
    async CCLLocalPo() {
        await this.defaultRootMenu.click();
        await this.purchaseMenu.click();
        await this.orderRootMenu.click();
        await this.localPoSubMenu.click();
        await this.createNewLocalPo.click();
        await this.page.waitForTimeout(1000);
        await this.selectPurchaseBase.click();
        await this.page.keyboard.press('ArrowDown');

        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);

        await this.selectCS.click();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);

        await this.selectSupplier.click();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);

        await this.saveButton.click();
        await this.page.waitForTimeout(1000);

        await this.submitButton.click();
        await this.page.waitForTimeout(1000);

        await this.confirmOrderButton.click();
        await this.page.waitForTimeout(1000);


    }
}
export default LocalPoPage;