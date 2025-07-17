const express = require("express");
const router = express.Router();

const {homeFormHandler} = require("../controller/homeFormController");

router.post("/homeform",homeFormHandler);

module.exports = router;