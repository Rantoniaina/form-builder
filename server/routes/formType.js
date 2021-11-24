const express = require('express');
const router = express.Router();
const formTypeController = require('../controllers/formType');

router.get('/', (_req, res) => {
  formTypeController.getAllFormTypes(res);
});

module.exports = router;
