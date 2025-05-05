"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LegislationController_1 = __importDefault(require("../controller/LegislationController"));
const router = (0, express_1.Router)();
const legislationController = new LegislationController_1.default();
router.post('/search', legislationController.search.bind(legislationController));
router.post('/getLegislationContent', legislationController.getLegislationContent.bind(legislationController));
router.get('/getSearchLocations', legislationController.getSearchLocations.bind(legislationController));
router.get('/getLegislationTypes', legislationController.getLegislationTypes.bind(legislationController));
exports.default = router;
