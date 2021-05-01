const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { upload } = require('../controllers/uploads');

const router = Router();

router.post('/', upload);

module.exports = router;
