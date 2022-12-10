const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  filter: {
    type: String,
    required: true,
  },
  miniPreview: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tags: [
    {
      type: String,
      default: [],
    },
  ],
  category: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  execution: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  htmlCode: {
    type: String,
    required: true,
  },
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('portfolio', portfolioSchema);
