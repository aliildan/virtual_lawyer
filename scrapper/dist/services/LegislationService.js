"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const LegislationServiceHelper_1 = require("../helpers/LegislationServiceHelper");
const LegislationTypes_1 = __importDefault(require("../enums/LegislationTypes"));
const LegislationUrlPrefixes_1 = require("../enums/LegislationUrlPrefixes");
const LegislationForms_1 = require("../enums/LegislationForms");
const LegislationSearchLocations_1 = __importDefault(require("../enums/LegislationSearchLocations"));
class LegislationService {
    constructor() {
        this.baseUrl = 'https://www.mevzuat.gov.tr/';
    }
    searchForLegislationTerm(term, legislationType, searchLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            let url;
            let formSelector;
            let termLocation;
            switch (legislationType) {
                case LegislationTypes_1.default.Laws:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.Laws;
                    formSelector = LegislationForms_1.LegislationForms.Laws;
                    break;
                case LegislationTypes_1.default.DecreesWithForceOfLaw:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.DecreesWithForceOfLaw;
                    formSelector = LegislationForms_1.LegislationForms.DecreesWithForceOfLaw;
                    break;
                case LegislationTypes_1.default.PresidentialDecrees:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.PresidentialDecrees;
                    formSelector = LegislationForms_1.LegislationForms.PresidentialDecrees;
                    break;
                case LegislationTypes_1.default.Regulations:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.Regulations;
                    formSelector = LegislationForms_1.LegislationForms.Regulations;
                    break;
                case LegislationTypes_1.default.PresidentialDecisions:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.PresidentialDecisions;
                    formSelector = LegislationForms_1.LegislationForms.PresidentialDecisions;
                    break;
                case LegislationTypes_1.default.PresidentialCirculars:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.PresidentialCirculars;
                    formSelector = LegislationForms_1.LegislationForms.PresidentialCirculars;
                    break;
                case LegislationTypes_1.default.AdministrativeRegulations:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.AdministrativeRegulations;
                    formSelector = LegislationForms_1.LegislationForms.AdministrativeRegulations;
                    break;
                case LegislationTypes_1.default.Notifications:
                    url = this.baseUrl + LegislationUrlPrefixes_1.LegislationUrlPrefixes.Notifications;
                    formSelector = LegislationForms_1.LegislationForms.Notifications;
                    break;
                default:
                    throw new Error('Invalid legislation type');
            }
            //string to lower case
            switch (searchLocation.toLowerCase()) {
                case "title":
                    termLocation = LegislationSearchLocations_1.default.Title;
                    break;
                case "content":
                    termLocation = LegislationSearchLocations_1.default.Content;
                    break;
                case "all":
                    termLocation = LegislationSearchLocations_1.default.All;
                    break;
                default:
                    throw new Error('Invalid search location');
            }
            const allResults = [];
            console.log('Navigating to ' + url);
            const browser = yield puppeteer_1.default.launch({ headless: process.env.NODE_ENV === 'production' });
            const page = yield browser.newPage();
            yield page.goto(url, { waitUntil: 'networkidle2' });
            yield page.waitForSelector(formSelector);
            console.log(formSelector + ' Form is ready');
            // fill the form
            console.log('Filling the form with term: ' + term);
            // check if the input is already loaded
            yield page.type('#AranacakIfade', term);
            yield page.select('#AranacakYer', termLocation);
            yield page.evaluate((formId) => {
                const form = document.querySelector(formId);
                if (form) {
                    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                    if (submitButton) {
                        submitButton.click(); // Simulate clicking the button instead of form.submit()
                        console.log('Submit button clicked');
                    }
                    else {
                        console.error("Submit button not found");
                    }
                }
            }, formSelector);
            // wait for the search ajax request to finish
            yield (0, LegislationServiceHelper_1.waitForLoading)(page);
            // get the search result searchTable
            const searchTableSelector = '#searchTable';
            yield page.waitForSelector(searchTableSelector);
            console.log('Search is done');
            // get 100 results
            console.log('Getting 100 results');
            yield page.select('#DataTables_Table_0_length select', '100');
            yield (0, LegislationServiceHelper_1.waitForLoading)(page);
            console.log('Results are ready');
            // get the results table
            const tableSelector = '#DataTables_Table_0_wrapper > div.row > div.col-sm-12 > table';
            let table = yield page.waitForSelector(tableSelector);
            if (table) {
                console.log('Pushing first page data to results');
                const legislations = yield (0, LegislationServiceHelper_1.pushLegislationDataToResults)(table, legislationType);
                allResults.push(...legislations);
            }
            let hasNextPage = !(yield page.$eval('li.paginate_button.page-item.last.disabled', button => button !== null).catch(() => false));
            let totalPages = yield page.evaluate(() => {
                const paginationItems = document.querySelectorAll('ul.pagination li.paginate_button.page-item');
                return paginationItems.length - 2; // Subtracting "İlk" and "Son"
            });
            console.log('Total pages: ' + totalPages);
            while (hasNextPage) {
                const nextPageButtonDisabled = yield page.$eval('li.paginate_button.page-item.last.disabled', button => button !== null).catch(() => false);
                if (totalPages === 0 || nextPageButtonDisabled) {
                    console.log('No more pages to navigate');
                    hasNextPage = false; // No more pages to navigate
                }
                else {
                    // Navigate to the next page
                    console.log('Navigating to the next page');
                    yield page.click('li.paginate_button.page-item.active + li a.page-link');
                    yield (0, LegislationServiceHelper_1.waitForLoading)(page);
                    totalPages--;
                    console.log('Remained page count: ' + totalPages);
                }
                let table = yield page.waitForSelector(tableSelector);
                if (table) {
                    console.log('Pushing next page data to results');
                    const legislations = yield (0, LegislationServiceHelper_1.pushLegislationDataToResults)(table, legislationType);
                    allResults.push(...legislations);
                }
            }
            console.log('All results are fetched' + allResults.length);
            yield browser.close();
            return allResults.map((law) => law.toJson());
        });
    }
    getLegislationContent(legislation) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({ headless: process.env.NODE_ENV === 'production' });
            try {
                const page = yield browser.newPage();
                yield page.goto(legislation.url, { waitUntil: 'networkidle2' });
                legislation.content = yield page.evaluate(() => {
                    // Select the main content inside the div with class "WordSection1"
                    const contentElement = document.querySelector('div.WordSection1');
                    if (contentElement) {
                        // Get all paragraph text and join them into a single string
                        const paragraphs = Array.from(contentElement.querySelectorAll('p'));
                        return paragraphs.map(p => p.innerText).join('\n\n');
                    }
                    return 'Content not found';
                });
                return legislation;
            }
            catch (error) {
                console.error('Error extracting content:', error);
                return null;
            }
            finally {
                // Close the browser instance
                yield browser.close();
            }
        });
    }
}
exports.default = LegislationService;
