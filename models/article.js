const mongoose = require('mongoose');
const { createDateFormat } = require('../utils/createDateFormat/createDateFormat');

const articleSchema = new mongoose.Schema({
  category: {
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
  miniPreview: {
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
    type: String,
    default: createDateFormat,
  },
  tags: [
    {
      type: String,
      default: [],
    },
  ],
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

module.exports = mongoose.model('article', articleSchema);
