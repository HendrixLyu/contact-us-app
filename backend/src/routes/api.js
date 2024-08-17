import express from 'express';
import { getContactInfo, saveFormData } from '../controller/contactController.js';

const router = express.Router();

router.get('/get-info', getContactInfo);
router.post('/save-info', saveFormData);

export default router;
