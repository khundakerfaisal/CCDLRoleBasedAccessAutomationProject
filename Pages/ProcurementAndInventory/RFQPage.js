class RFQPage {
    constructor(page) {
        this.page = page;
        this.defaultRootMenu = page.getByTitle('Home Menu');
        // Purchase menu remains the same
        this.purchaseMenu = page.getByRole('menuitem', { name: 'Purchase' });
        this.orderRootMenu = page.getByRole('button', { name: 'Orders' })
        this.RfqSubMenu = page.getByRole('menuitem', { name: 'Request For Quotation' })
        this.createNewRfq = page.getByRole('button', { name: 'New' })
        this.selectPR = page.getByRole('textbox', { name: 'Purchase Requisition' })
        this.saveRfq = page.getByRole('button', { name: 'Save manually' })
        this.confirmRfq = page.getByRole('button', { name: 'Confirm' })
        this.createQuotation = page.getByRole('button', { name: ' Create Quotation' })
        this.selectPartner = page.getByRole('textbox', { name: 'Partner' })
        this.createQuotationButton = page.getByRole('button', { name: 'Create Quotation' });

    }
    async CCLRfq() {
        await this.defaultRootMenu.click();
        await this.purchaseMenu.click();
        await this.orderRootMenu.click();
        await this.RfqSubMenu.click();
        await this.createNewRfq.click();
        await this.page.waitForTimeout(1000);
        await this.selectPR.click();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.saveRfq.click();
        await this.confirmRfq.click();
        await this.createQuotation.click();
        await this.page.waitForTimeout(1000);
        await this.selectPartner.click();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectPartner.click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.selectPartner.click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        // Wait for modal to appear
        const modal = this.page.locator('div.modal-content');
        await modal.waitFor({ state: 'visible' });
        // Locate all price_unit cells inside modal table
        const priceCells = modal.locator('td[name="price_unit"] div.o_field_widget');
        // console.log(`Found ${count} price cells`);
        const count = await priceCells.count();

        for (let i = 0; i < count; i++) {
            const cell = priceCells.nth(i);
            await cell.click(); // Focus the cell
            // Select all text and type new value
            await cell.press('Control+A');
            await cell.type(`${(i + 1) * 100}`);
            await this.page.waitForTimeout(500);
        }

        await this.page.waitForTimeout(1000);

        // Click the visible "Create Quotation" button after all prices are filled
        const createQuotationButton = modal.locator('button[name="action_create_quotations"]:visible');
        await createQuotationButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(1000);
        await createQuotationButton.click();
        await this.page.waitForTimeout(1000);
        // await this.page.pause();
    }
}
export default RFQPage;