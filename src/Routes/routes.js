const express = require("express");
const router = express.Router()
// const collegeController = require('../Controllers/collegeController')
// const internController = require('../Controllers/internController')
//--------------------------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My server is running awesome!")
})
//--------------------------------------------------------//
module.exports = router