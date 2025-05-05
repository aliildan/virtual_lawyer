import { Router } from 'express';
import  LegislationController from '../controller/LegislationController';

const router = Router();
const legislationController = new LegislationController();

router.post('/search', legislationController.search.bind(legislationController));
router.post('/getLegislationContent', legislationController.getLegislationContent.bind(legislationController));
router.get('/getSearchLocations', legislationController.getSearchLocations.bind(legislationController));
router.get('/getLegislationTypes', legislationController.getLegislationTypes.bind(legislationController));


export default router;