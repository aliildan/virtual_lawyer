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
exports.waitForLoading = waitForLoading;
exports.extractLegislationDataFromRows = extractLegislationDataFromRows;
exports.pushLegislationDataToResults = pushLegislationDataToResults;
const Legislation_1 = __importDefault(require("../models/Legislation"));
function parseData(rawData, legislationType) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        console.log('Parsing law data for legislationType ' + legislationType.toString(), rawData);
        let splitName = getSplitName(legislationType);
        return new Legislation_1.default(rawData.split(splitName)[0].trim(), // title
        parseInt(((_b = (_a = rawData.split('Tertip:')[1]) === null || _a === void 0 ? void 0 : _a.split('Resmî Gazete Tarihi:')[0]) === null || _b === void 0 ? void 0 : _b.trim()) || "0"), // composition - Line containing 'Tertip
        ((_d = (_c = rawData.split('Resmî Gazete Tarihi:')[1]) === null || _c === void 0 ? void 0 : _c.split('Sayısı:')[0]) === null || _d === void 0 ? void 0 : _d.trim()) || "", // official_gazette_date - Line containing 'Resmî Gazete Tarihi'
        parseInt(((_f = (_e = rawData.split('Sayısı:')[1]) === null || _e === void 0 ? void 0 : _e.split('Kabul Tarihi:')[0]) === null || _f === void 0 ? void 0 : _f.trim()) || "0"), // number - Line containing 'Sayısı'
        ((_g = rawData.split('Kabul Tarihi:')[1]) === null || _g === void 0 ? void 0 : _g.trim()) || "", // acceptance_date - Line containing 'Kabul Tarihi'
        legislationType // type
        );
    }
    catch (error) {
        console.error("Error parsing law data:", [error, rawData]);
        return null;
    }
}
function getSplitName(legislationType) {
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
function waitForLoading(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForSelector('#loaderContainer[style="display: block;"]');
        yield page.waitForSelector('#loaderContainer[style="display: none;"]');
    });
}
function extractLegislationDataFromRows(rows, legislationType) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Extracting legislation data from rows, rows count: ' + rows.length);
        const lawModels = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let columns = yield row.$$('td');
            let law = yield columns[1].$eval('a', (a) => a.textContent);
            let id = yield columns[0].$eval('a', (a) => a.textContent);
            if (law && id) {
                let lawModel = parseData(law, legislationType);
                if (lawModel) {
                    lawModel.id = parseInt(id);
                    lawModels.push(lawModel);
                }
            }
        }
        return lawModels;
    });
}
function pushLegislationDataToResults(table, legislationType) {
    return __awaiter(this, void 0, void 0, function* () {
        let rows = yield table.$$('tbody tr');
        return yield extractLegislationDataFromRows(rows, legislationType);
    });
}
