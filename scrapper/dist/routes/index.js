"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LegislationRoutes_1 = __importDefault(require("./LegislationRoutes"));
const router = (0, express_1.Router)();
// Base route for the API
router.get('/', (req, res) => {
    res.send('Welcome to the API Home');
});
router.use('/legislation', LegislationRoutes_1.default);
exports.default = router;
