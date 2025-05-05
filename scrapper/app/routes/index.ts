import { Router } from 'express';
import legislationRoutes from "./LegislationRoutes";

const router: Router = Router();

// Base route for the API
router.get('/', (req, res) => {
    res.send('Welcome to the API Home');
});

router.use('/legislation', legislationRoutes);

export default router;