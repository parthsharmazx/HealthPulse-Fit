const express = require('express');
const router = express.Router();
const { getDietPlans, getDietPlanById } = require('../controllers/dietController');

router.get('/', getDietPlans);
router.get('/:id', getDietPlanById);

module.exports = router;
