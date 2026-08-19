import { getAllocationNumber, getTotalQty, saveTotalQty } from "../Utils/utility";

class WeightScale2ndWeightPages {
    constructor(page, context) {
        this.page = page;
        this.context = context;

        this.homeMenu = page.locator("//button[@title='Home Menu']");
        this.weightScaleMenu = page.locator("//a[@data-menu-xmlid='weight_scale.weight_scale_root_menu']");

        this.searchBox = page.locator("//input[@role='searchbox']");
        this.commentBox = page.locator("#chalan_no_0");

        this.weightMachineMenu = page.locator("//a[@data-menu-xmlid='weight_scale.weight_machine_menu']");

        this.selectAllocationNumber = page.locator(".o_menu_item");

        this.deliveryQty = page.locator("//div[@name='total_delivery_qty_in_kg']//span");
        this.firstWeightQty = page.locator("//div[@name='second_weight']//span");

        this.tableDataSelection = page.locator("//tr/td[@name='allocation_id']");
        this.tableRowDataSelection = page.locator(".o_data_row");

        this.inputWeight = page.locator("#weight_0");
        this.okButton = page.locator("//button[text()='Ok']");

        this.secondWeightSelectionButton = page.locator(".btn-primary");
        this.saveButton = page.locator("//button[@data-tooltip='Save manually']");
        this.calculateButton = page.locator("//button[@name='action_calculate_final_weight_with_confirm']");

        this.modalSelection = page.locator(".modal-content");
        this.convertAndConfirmButton = page.locator("//button[@name='action_confirm']");
    }

    async weight2ndEntryPage() {

        await this.homeMenu.click();
        await this.weightScaleMenu.click();

        await this.searchBox.fill(await getAllocationNumber());
        await this.selectAllocationNumber.nth(1).click();
        await this.page.waitForTimeout(1000);

        await this.tableDataSelection.click();
        await this.page.waitForTimeout(1000);

        await saveTotalQty(await this.totalQty());
        await this.page.waitForTimeout(1000);




        // Open Weight Machine in a new tab
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.weightMachineMenu.click({
                modifiers: ["Control"] // Use ["Meta"] for macOS
            })
        ]);

        await newPage.waitForLoadState();

        const machine = new WeightScale2ndWeightPages(newPage, this.context);

        await machine.tableRowDataSelection.first().click();

        await machine.inputWeight.fill(await getTotalQty());
        await this.page.waitForTimeout(1000);

        await machine.saveButton.click();
        await this.page.waitForTimeout(1000);

        await newPage.close();

        await this.page.bringToFront();

        await this.secondWeightSelectionButton.nth(3).click();
        await this.page.waitForTimeout(1000);

        await this.okButton.click();
        await this.page.waitForTimeout(1000);

        await this.calculateButton.click();
        await this.page.waitForTimeout(1000);

        await this.modalSelection.first().click();

        await this.convertAndConfirmButton.click();
        await this.page.waitForTimeout(1000);
    }

    async totalQty() {

        const first = await this.firstWeightQty.textContent();
        const delivery = await this.deliveryQty.textContent();

        const firstQty = parseFloat(first.replace(/[^0-9.]/g, ""));
        const deliveryQty = parseFloat(delivery.replace(/[^0-9.]/g, ""));

        const total = firstQty + deliveryQty;

        console.log("Calculated Total:", total.toString());

        return total.toString();
    }
}

export default WeightScale2ndWeightPages;