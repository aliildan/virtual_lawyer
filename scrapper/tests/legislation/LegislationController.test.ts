import request from 'supertest';
import express from 'express';
import LegislationController from '../../app/controller/LegislationController';

const app = express();
app.use(express.json());

const legislationController = new LegislationController();
app.post('/api/legislation/search', legislationController.search);

describe('LegislationController', () => {
    it('should return 400 if searchTerm, legislationTypeId, or searchLocation is missing', async () => {
        const response = await request(app)
            .post('/api/legislation/search')
            .send({ searchTerm: 'kira', legislationTypeId: 1 });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Both searchTerm, legislationType and searchLocation are required.' });
    });
});

app.get('/api/legislation/getSearchLocations', legislationController.getSearchLocations);
describe('LegislationController', () => {
    it('should return all search locations', async () => {
        const response = await request(app)
            .get('/api/legislation/getSearchLocations');

        expect(response.body).toEqual({ data: ['All','Content','Title'] });
    });
});

app.get('/api/legislation/getLegislationTypes', legislationController.getLegislationTypes);
describe('LegislationController', () => {
    it('should return all legislation types', async () => {
        const response = await request(app)
            .get('/api/legislation/getLegislationTypes');

        expect(response.body).toEqual({ data: [
                {
                    "name": "Laws",
                    "legislationTypeId": 1
                },
                {
                    "name": "DecreesWithForceOfLaw",
                    "legislationTypeId": 4
                },
                {
                    "name": "PresidentialDecrees",
                    "legislationTypeId": 19
                },
                {
                    "name": "Regulations",
                    "legislationTypeId": 2
                },
                {
                    "name": "PresidentialDecisions",
                    "legislationTypeId": 0
                },
                {
                    "name": "PresidentialCirculars",
                    "legislationTypeId": -1
                },
                {
                    "name": "AdministrativeRegulations",
                    "legislationTypeId": 21
                },
                {
                    "name": "Notifications",
                    "legislationTypeId": 9
                }
            ] });
    });
});