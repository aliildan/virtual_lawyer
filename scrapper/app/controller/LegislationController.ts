import { RequestHandler } from 'express';
import LegislationService from '../services/LegislationService';
import Legislation from "../models/Legislation";
import LegislationSearchLocations from "../enums/LegislationSearchLocations";
import LegislationTypes from "../enums/LegislationTypes";
import legislation from "../models/Legislation";

class LegislationController {

    public search: RequestHandler = (req, res,next) => {
        const { searchTerm, legislationTypeId,searchLocation } = req.body;
        if (!searchTerm || !legislationTypeId || !searchLocation) {
            res.status(400).json({ error: "Both searchTerm, legislationType and searchLocation are required." });
            return;
        }
        console.log("Search Term: ", searchTerm);
        console.log("Legislation Type: ", legislationTypeId);
        const legislationService = new LegislationService();
        legislationService.searchForLegislationTerm(searchTerm, legislationTypeId,searchLocation.toLowerCase()).then((result: object[]) => {
            res.json({'resultCount':result.length,'data': result});
        });
    }

    public getSearchLocations: RequestHandler = (req, res) => {
        res.json({'data':LegislationSearchLocations.keys()});
    }

    public getLegislationTypes: RequestHandler = (req, res) => {
        res.json({'data':LegislationTypes.all()});
    }

    public getLegislationContent: RequestHandler = (req, res) => {
        const {id,type,title,composition,official_gazette_date,number,acceptance_date,url } = req.body;
        if (!id) {
            res.status(400).json({ error: "id is required." });
            return;
        }
        console.log("Request body: " , req.body);
        let legislation = new Legislation(title,composition,official_gazette_date,number,acceptance_date,type);
        legislation.id = id;
        const legislationService = new LegislationService();
        legislationService.getLegislationContent(legislation).then((result: legislation|null) => {
            res.json({'data': result?.toJson()});
        })
    }
}

export default LegislationController;