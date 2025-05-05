"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LegislationSearchLocations;
(function (LegislationSearchLocations) {
    LegislationSearchLocations["All"] = "1";
    LegislationSearchLocations["Content"] = "3";
    LegislationSearchLocations["Title"] = "2";
})(LegislationSearchLocations || (LegislationSearchLocations = {}));
(function (LegislationSearchLocations) {
    function getEnums() {
        return Object.fromEntries(Object.entries(LegislationSearchLocations));
    }
    LegislationSearchLocations.getEnums = getEnums;
    function keys() {
        return Object.keys(LegislationSearchLocations).filter(key => key !== 'keys' && key !== 'getEnums');
    }
    LegislationSearchLocations.keys = keys;
})(LegislationSearchLocations || (LegislationSearchLocations = {}));
exports.default = LegislationSearchLocations;
