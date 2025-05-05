"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LegislationTypes;
(function (LegislationTypes) {
    LegislationTypes[LegislationTypes["Laws"] = 1] = "Laws";
    LegislationTypes[LegislationTypes["DecreesWithForceOfLaw"] = 4] = "DecreesWithForceOfLaw";
    LegislationTypes[LegislationTypes["PresidentialDecrees"] = 19] = "PresidentialDecrees";
    LegislationTypes[LegislationTypes["Regulations"] = 2] = "Regulations";
    LegislationTypes[LegislationTypes["PresidentialDecisions"] = 0] = "PresidentialDecisions";
    LegislationTypes[LegislationTypes["PresidentialCirculars"] = -1] = "PresidentialCirculars";
    LegislationTypes[LegislationTypes["AdministrativeRegulations"] = 21] = "AdministrativeRegulations";
    LegislationTypes[LegislationTypes["Notifications"] = 9] = "Notifications";
})(LegislationTypes || (LegislationTypes = {}));
(function (LegislationTypes) {
    function getEnums() {
        return Object.fromEntries(Object.entries(LegislationTypes));
    }
    LegislationTypes.getEnums = getEnums;
    function keys() {
        return Object.keys(LegislationTypes).filter(key => key !== 'keys' && key !== 'getEnums' && key !== 'all');
    }
    LegislationTypes.keys = keys;
    function all() {
        return Object.entries(LegislationTypes)
            .filter(([key, value]) => isNaN(Number(key)))
            .filter(([key]) => key !== 'keys' && key !== 'getEnums' && key !== 'all')
            .map(([key, value]) => ({
            name: key,
            legislationTypeId: value
        }));
    }
    LegislationTypes.all = all;
})(LegislationTypes || (LegislationTypes = {}));
exports.default = LegislationTypes;
