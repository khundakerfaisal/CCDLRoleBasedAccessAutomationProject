import fs from "fs";
import path from "path";

export function generateNumber() {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    return `AUTO-${year}${month}${day}-${hour}${minute}${second}`;
}

export function generateRandomAmount(min = 1000, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomTinNumber(min = 999999, max = 111111) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMobileNumber() {
    const prefixes = [
        "013", "014", "015", "016", "017", "018", "019"
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0");

    return prefix + suffix; // 3 + 8 = 11 digits
}

export function getAllocationNumber() {
    const filePath = "./tests/resources/allocationNumber.json";


    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("allocationNumber.json is empty.");
    }

    return data.at(-1).AllocationNumber;
}


export class AllocationNumber {

    static async scrollDown(page) {
        await page.evaluate(() => window.scrollBy(0, 1000));
    }

    static async scrollUp(page) {
        await page.evaluate(() => window.scrollBy(0, -1000));
    }



    static async getAllocationNumber() {

        const filePath = "./tests/resources/allocationNumber.json";

        const data = JSON.parse(
            fs.readFileSync(filePath, "utf8")
        );

        return data[data.length - 1];
    }


    static async saveAllocationNumber(allocationNumber) {


        const filePath = "./tests/resources/allocationNumber.json";

        let json = [];

        if (fs.existsSync(filePath)) {

            const content = fs.readFileSync(
                filePath,
                "utf8"
            ).trim();

            if (content) {
                json = JSON.parse(content);
            }
        }


        json.push({
            AllocationNumber: allocationNumber
        });


        fs.writeFileSync(
            filePath,
            JSON.stringify(json, null, 2),
            "utf8"
        );


        return allocationNumber;
    }
}

// utils/utility.js


export class generateAgentCustomer {

    static async generateAutoAgentCustomer() {
        const filePath = "tests/resources/AgentCustomer.json";
        const prefixName = "Automatic Dealer-";
        let generateLastNumber = 0;

        let agents = [];

        // Read existing JSON file
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, "utf8");
                agents = data ? JSON.parse(data) : [];
            } catch (err) {
                agents = [];
            }
        }

        // Get last generated number
        if (agents.length > 0) {
            const lastAgent = agents[agents.length - 1].AgentName;
            generateLastNumber = parseInt(
                lastAgent.replace(prefixName, ""),
                10
            );
        }

        // Generate next customer
        const generateAgentName = `${prefixName}${generateLastNumber + 1}`;

        // Save into JSON
        agents.push({
            AgentName: generateAgentName
        });

        fs.writeFileSync(
            filePath,
            JSON.stringify(agents, null, 2),
            "utf8"
        );

        return generateAgentName;
    }

    static async getAgentName() {
        const filePath = "tests/resources/AgentCustomer.json";

        if (!fs.existsSync(filePath)) {
            throw new Error("agentCustomer.json not found.");
        }

        const agents = JSON.parse(
            fs.readFileSync(filePath, "utf8")
        );

        return agents[agents.length - 1];
    }
}

export class generateCorporateCustomer {

    static async generateAutoCorporateCustomer() {
        const filePath = "tests/resources/CorporateCustomer.json";
        const prefixName = "Automated Corporate-";
        let generateLastNumber = 0;

        let corporate = [];

        // Read existing JSON file
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, "utf8");
                corporate = data ? JSON.parse(data) : [];
            } catch (err) {
                corporate = [];
            }
        }

        // Get last generated number
        if (corporate.length > 0) {
            const lastCorporate = corporate[corporate.length - 1].CorporateName;
            generateLastNumber = parseInt(
                lastCorporate.replace(prefixName, ""),
                10
            );
        }

        // Generate next customer
        const generateCorporateName = `${prefixName}${generateLastNumber + 1}`;

        // Save into JSON
        corporate.push({
            CorporateName: generateCorporateName
        });

        fs.writeFileSync(
            filePath,
            JSON.stringify(corporate, null, 2),
            "utf8"
        );

        return generateCorporateName;
    }

    static async getCorporateName() {
        const filePath = "tests/resources/CorporateCustomer.json";

        if (!fs.existsSync(filePath)) {
            throw new Error("corporateCustomer.json not found.");
        }

        const corporate = JSON.parse(
            fs.readFileSync(filePath, "utf8")
        );

        return corporate[corporate.length - 1];
    }
}



const filePath = "tests/resources/totalQty.json";

export function saveTotalQty(totalQty) {
    let data = [];

    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        if (fileContent.trim()) {
            data = JSON.parse(fileContent);
        }
    }

    data.push({
        TotalQty: totalQty
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return totalQty;
}

export function getTotalQty() {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const lastTotalQty = data[data.length - 1].TotalQty;

    console.log("Total Qty:", lastTotalQty);

    return lastTotalQty;
}
