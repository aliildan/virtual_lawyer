import puppeteer, {Browser, Page} from 'puppeteer';
import {pushLegislationDataToResults, waitForLoading} from '../helpers/LegislationServiceHelper';
import LegislationTypes from "../enums/LegislationTypes";
import {LegislationUrlPrefixes} from "../enums/LegislationUrlPrefixes";
import {LegislationForms} from "../enums/LegislationForms";
import Legislation from "../models/Legislation";
import LegislationSearchLocations from "../enums/LegislationSearchLocations";

class LegislationService {
    private readonly baseUrl: string = 'https://www.mevzuat.gov.tr/';

    async searchForLegislationTerm(term: string, legislationType: number, searchLocation:string) {
        let url: string;
        let formSelector: string;
        let termLocation: string;
        switch (legislationType) {
            case LegislationTypes.Laws:
                url = this.baseUrl + LegislationUrlPrefixes.Laws;
                formSelector = LegislationForms.Laws;
                break;
            case LegislationTypes.DecreesWithForceOfLaw:
                url = this.baseUrl + LegislationUrlPrefixes.DecreesWithForceOfLaw;
                formSelector = LegislationForms.DecreesWithForceOfLaw;
                break;
            case LegislationTypes.PresidentialDecrees:
                url = this.baseUrl + LegislationUrlPrefixes.PresidentialDecrees;
                formSelector = LegislationForms.PresidentialDecrees;
                break;
            case LegislationTypes.Regulations:
                url = this.baseUrl + LegislationUrlPrefixes.Regulations;
                formSelector = LegislationForms.Regulations;
                break;
            case LegislationTypes.PresidentialDecisions:
                url = this.baseUrl + LegislationUrlPrefixes.PresidentialDecisions;
                formSelector = LegislationForms.PresidentialDecisions;
                break;
            case LegislationTypes.PresidentialCirculars:
                url = this.baseUrl + LegislationUrlPrefixes.PresidentialCirculars;
                formSelector = LegislationForms.PresidentialCirculars;
                break;
            case LegislationTypes.AdministrativeRegulations:
                url = this.baseUrl + LegislationUrlPrefixes.AdministrativeRegulations;
                formSelector = LegislationForms.AdministrativeRegulations;
                break;
            case LegislationTypes.Notifications:
                url = this.baseUrl + LegislationUrlPrefixes.Notifications;
                formSelector = LegislationForms.Notifications;
                break;
            default:
                throw new Error('Invalid legislation type');
        }

        //string to lower case
        switch (searchLocation.toLowerCase()) {
            case "title":
                termLocation = LegislationSearchLocations.Title;
                break;
            case "content":
                termLocation = LegislationSearchLocations.Content;
                break;
            case "all":
                termLocation = LegislationSearchLocations.All;
                break;
            default:
                throw new Error('Invalid search location');
        }

        const allResults: Legislation[] = [];
        console.log('Navigating to ' + url);
        const browser: Browser = await puppeteer.launch({headless: process.env.NODE_ENV === 'production'});
        const page: Page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.waitForSelector(formSelector);
        console.log(formSelector + ' Form is ready');
        // fill the form
        console.log('Filling the form with term: ' + term);
        // check if the input is already loaded
        await page.type('#AranacakIfade', term);
        await page.select('#AranacakYer', termLocation);

        await page.evaluate((formId) => {
            const form = document.querySelector(formId);
            if (form) {
                const submitButton: HTMLFormElement | null = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                    submitButton.click(); // Simulate clicking the button instead of form.submit()
                    console.log('Submit button clicked');
                } else {
                    console.error("Submit button not found");
                }
            }
        }, formSelector);

        // wait for the search ajax request to finish
        await waitForLoading(page);
        // get the search result searchTable
        const searchTableSelector = '#searchTable';
        await page.waitForSelector(searchTableSelector);
        console.log('Search is done');
        // get 100 results
        console.log('Getting 100 results');
        await page.select('#DataTables_Table_0_length select', '100');
        await waitForLoading(page);
        console.log('Results are ready');
        // get the results table
        const tableSelector = '#DataTables_Table_0_wrapper > div.row > div.col-sm-12 > table';
        let table = await page.waitForSelector(tableSelector);
        if (table) {
            console.log('Pushing first page data to results');
            const legislations = await pushLegislationDataToResults(table, legislationType);
            allResults.push(...legislations);
        }
        let hasNextPage = !(await page.$eval('li.paginate_button.page-item.last.disabled', button => button !== null).catch(() => false));
        let totalPages = await page.evaluate(() => {
            const paginationItems = document.querySelectorAll('ul.pagination li.paginate_button.page-item');
            return paginationItems.length - 2; // Subtracting "İlk" and "Son"
        });
        console.log('Total pages: ' + totalPages);
        while (hasNextPage) {
            const nextPageButtonDisabled = await page.$eval('li.paginate_button.page-item.last.disabled', button => button !== null).catch(() => false);
            if (totalPages === 0 || nextPageButtonDisabled) {
                console.log('No more pages to navigate');
                hasNextPage = false; // No more pages to navigate
            } else {
                // Navigate to the next page
                console.log('Navigating to the next page');
                await page.click('li.paginate_button.page-item.active + li a.page-link');
                await waitForLoading(page);
                totalPages--;
                console.log('Remained page count: ' + totalPages);
            }

            let table = await page.waitForSelector(tableSelector);
            if (table) {
                console.log('Pushing next page data to results');
                const legislations = await pushLegislationDataToResults(table, legislationType);
                allResults.push(...legislations);
            }
        }

        console.log('All results are fetched' + allResults.length);
        await browser.close();
        return allResults.map((law) => law.toJson());
    }

    async getLegislationContent(legislation: Legislation): Promise<Legislation | null> {
        const browser: Browser = await puppeteer.launch({headless: process.env.NODE_ENV === 'production'});
        try {
            const page: Page = await browser.newPage();
            await page.goto(legislation.url, {waitUntil: 'networkidle2'});
            legislation.content = await page.evaluate(() => {
                // Select the main content inside the div with class "WordSection1"
                const contentElement = document.querySelector('div.WordSection1');
                if (contentElement) {
                    // Get all paragraph text and join them into a single string
                    const paragraphs = Array.from(contentElement.querySelectorAll('p'));
                    return paragraphs.map(p => p.innerText).join('\n\n');
                }
                return 'Content not found';
            })
            return legislation;
        } catch (error) {
            console.error('Error extracting content:', error);
            return null;
        } finally {
            // Close the browser instance
            await browser.close();
        }
    }
}

export default LegislationService;

