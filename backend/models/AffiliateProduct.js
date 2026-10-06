const mongoose = require('mongoose');

const affiliateProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Supplements', 'Gym Gear', 'Books'],
      required: true
    },
    badge: String,
    rating: {
      type: Number,
      default: 4.5
    },
    reviewsCount: {
      type: Number,
      default: 100
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: Number,
    discount: String,
    affiliateTag: {
      type: String,
      default: 'healthpulse-20'
    },
    affiliateUrl: {
      type: String,
      required: true
    },
    imageUrl: String,
    features: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('AffiliateProduct', affiliateProductSchema);
