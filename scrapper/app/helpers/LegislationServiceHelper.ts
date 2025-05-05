import {ElementHandle, Page} from "puppeteer";
import Legislation from "../models/Legislation";



function parseData(rawData: string, legislationType: number): Legislation | null {
    try {
        console.log('Parsing law data for legislationType ' + legislationType.toString(), rawData);
        let splitName = getSplitName(legislationType);
        return new Legislation(
            rawData.split(splitName)[0].trim(), // title
            parseInt(rawData.split('Tertip:')[1]?.split('Resmî Gazete Tarihi:')[0]?.trim() || "0"), // composition - Line containing 'Tertip
            rawData.split('Resmî Gazete Tarihi:')[1]?.split('Sayısı:')[0]?.trim() || "", // official_gazette_date - Line containing 'Resmî Gazete Tarihi'
            parseInt(rawData.split('Sayısı:')[1]?.split('Kabul Tarihi:')[0]?.trim() || "0"), // number - Line containing 'Sayısı'
            rawData.split('Kabul Tarihi:')[1]?.trim() || "", // acceptance_date - Line containing 'Kabul Tarihi'
            legislationType // type
        )
    } catch (error) {
        console.error("Error parsing law data:", [error, rawData]);
        return null;
    }

}

function getSplitName(legislationType: number): string {
    switch (legislationType) {
        case 1:
            return 'Kanunlar';
        case 4:
            return 'Kanun Hükmünde Kararnameler';
        case 19:
            return 'Cumhurbaşkanlığı Kararnameleri';
        case 2:
            return 'Tüzükler';
        case 0:
            return 'Cumhurbaşkanı Kararları';
        case -1:
            return 'Cumhurbaşkanlığı Genelgeleri';
        case 21:
            return 'Yönetmelikler';
        case 9:
            return 'Tebliğler';
        default:
            return '';
    }

}
export async function waitForLoading(page: Page) {
    await page.waitForSelector('#loaderContainer[style="display: block;"]');
    await page.waitForSelector('#loaderContainer[style="display: none;"]');
}

export async function extractLegislationDataFromRows(rows: ElementHandle<HTMLTableRowElement>[],legislationType:number): Promise<Legislation[]> {
    console.log('Extracting legislation data from rows, rows count: ' + rows.length);
    const lawModels: Legislation[] = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let columns = await row.$$('td');
        let law = await columns[1].$eval('a', (a) => a.textContent);
        let id = await columns[0].$eval('a', (a) => a.textContent);
        if (law && id) {
            let lawModel: Legislation | null = parseData(law,legislationType);
            if (lawModel) {
                lawModel.id = parseInt(id);
                lawModels.push(lawModel);
            }
        }
    }
    return lawModels;
}

export async function pushLegislationDataToResults(table: ElementHandle<HTMLTableElement>, legislationType: number) {
    let rows = await table.$$('tbody tr');
    return await extractLegislationDataFromRows(rows,legislationType);
}

