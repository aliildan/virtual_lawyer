"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LegislationService_1 = __importDefault(require("../services/LegislationService"));
const Legislation_1 = __importDefault(require("../models/Legislation"));
const LegislationSearchLocations_1 = __importDefault(require("../enums/LegislationSearchLocations"));
const LegislationTypes_1 = __importDefault(require("../enums/LegislationTypes"));
class LegislationController {
    constructor() {
        this.search = (req, res, next) => {
            const { searchTerm, legislationTypeId, searchLocation } = req.body;
            if (!searchTerm || !legislationTypeId || !searchLocation) {
                res.status(400).json({ error: "Both searchTerm, legislationType and searchLocation are required." });
                return;
            }
            console.log("Search Term: ", searchTerm);
            console.log("Legislation Type: ", legislationTypeId);
            const legislationService = new LegislationService_1.default();
            legislationService.searchForLegislationTerm(searchTerm, legislationTypeId, searchLocation.toLowerCase()).then((result) => {
                res.json({ 'resultCount': result.length, 'data': result });
            });
        };
        this.getSearchLocations = (req, res) => {
            res.json({ 'data': LegislationSearchLocations_1.default.keys() });
        };
        this.getLegislationTypes = (req, res) => {
            res.json({ 'data': LegislationTypes_1.default.all() });
        };
        this.getLegislationContent = (req, res) => {
            const { id, type, title, composition, official_gazette_date, number, acceptance_date, url } = req.body;
            if (!id) {
                res.status(400).json({ error: "id is required." });
                return;
            }
            console.log("Request body: ", req.body);
            let legislation = new Legislation_1.default(title, composition, official_gazette_date, number, acceptance_date, type);
            legislation.id = id;
            const legislationService = new LegislationService_1.default();
            legislationService.getLegislationContent(legislation).then((result) => {
                res.json({ 'data': result === null || result === void 0 ? void 0 : result.toJson() });
            });
        };
    }
}
exports.default = LegislationController;
