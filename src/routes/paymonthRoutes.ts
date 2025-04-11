import { Router } from "express";

import {
    createPaymonth,
    getPaymonths,
    getPaymonthById,
    updatePaymonth,
    deletePaymonth
} from '../controllers/paymonthController';

const router = Router();

router.get('/', getPaymonths);
router.get('/:id', getPaymonthById);
router.post('/', createPaymonth);
router.put('/:id', updatePaymonth);
router.delete('/:id', deletePaymonth);

export default router;