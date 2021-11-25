const express = require('express');
const router = express.Router();
const formController = require('../controllers/form');

router.post('/', (req, res) => {
  formController.createForm(req, res);
});

router.get('/:id', (req, res) => {
  formController.getForm(req, res);
});

module.exports = router;
