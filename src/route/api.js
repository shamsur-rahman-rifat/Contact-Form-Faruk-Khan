import { Router } from 'express'
import { sendContactEmail, sendPartialFormData } from '../controller/mailController.js'
import { getEventTypes, getAvailableTimes, createCalcomBooking } from '../controller/bookingController.js'

const router=Router()

// Mail Routes

router.post('/sendContactEmail', sendContactEmail);
router.post('/sendPartialFormData', sendPartialFormData);

// Booking Routes

router.post('/getEventTypes', getEventTypes);
router.post('/getAvailableTimes', getAvailableTimes);
router.post('/createCalcomBooking', createCalcomBooking);


export default router;