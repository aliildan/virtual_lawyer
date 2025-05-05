enum LegislationTypes {
    Laws = 1,
    DecreesWithForceOfLaw = 4,
    PresidentialDecrees = 19,
    Regulations = 2,
    PresidentialDecisions = 0,
    PresidentialCirculars = -1,
    AdministrativeRegulations = 21,
    Notifications = 9
}

namespace LegislationTypes {
    export function getEnums(): object {
        return Object.fromEntries(Object.entries(LegislationTypes));
    }

    export function keys(): string[] {
        return Object.keys(LegislationTypes).filter(key => key !== 'keys' && key !== 'getEnums' && key !== 'all');
    }

    export function all(): { name: string; legislationTypeId: unknown }[] {
        return Object.entries(LegislationTypes)
            .filter(([key, value]) => isNaN(Number(key)))
            .filter(([key]) => key !== 'keys' && key !== 'getEnums' && key !== 'all')
            .map(([key, value]) => ({
                name: key,
                legislationTypeId:value
            }));
    }
}

export default LegislationTypes;