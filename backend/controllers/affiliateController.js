const AffiliateProduct = require('../models/AffiliateProduct');
const memoryStore = require('../data/memoryStore');
const { getDbStatus } = require('../config/db');

// @desc    Get affiliate products with category filter
// @route   GET /api/affiliate
const getAffiliateProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = {};
      if (category && category !== 'All') {
        filter.category = category;
      }
      const products = await AffiliateProduct.find(filter);
      return res.json(products);
    } else {
      const products = memoryStore.getAffiliateProducts({ category });
      return res.json(products);
    }
  } catch (error) {
    console.error('Error fetching affiliate products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

module.exports = {
  getAffiliateProducts
};
