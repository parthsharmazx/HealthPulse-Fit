const express = require('express');
const router = express.Router();
const { getAffiliateProducts } = require('../controllers/affiliateController');

router.get('/', getAffiliateProducts);

module.exports = router;
