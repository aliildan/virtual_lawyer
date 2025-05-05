enum LegislationSearchLocations {
    All = "1",
    Content = "3",
    Title = "2",
}
namespace LegislationSearchLocations {
    export function getEnums(): object {
        return Object.fromEntries(Object.entries(LegislationSearchLocations));
    }
    export function keys(): string[] {
        return Object.keys(LegislationSearchLocations).filter(key => key !== 'keys' && key !== 'getEnums');
    }
}

export default LegislationSearchLocations;