const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { uploadFile } = require('../controllers/uploads');

const router = Router();

router.post('/', uploadFile);

module.exports = router;
