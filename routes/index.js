import express from 'express';
import analysisRouter from './analysisRouter';
let router = express.Router();
router.use('/analysis', router);

export default router;