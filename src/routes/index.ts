import { getReference, getResult } from "./routes";
import { Router } from 'express';

const router = Router();

router.post('/get-reference', getReference);
router.get('/get-result/:referenceId', getResult);

export default router;