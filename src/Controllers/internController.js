const collegeModel = require("../Models/collegeModel")
const internModel = require("../Models/internModel")
const ObjectId = require("mongoose").Types.ObjectId

const nameRegex = /^[a-zA-Z\\s]*$/
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
const mobileRegex = /^[0-9]{10}$/


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (request) {
    return (Object.keys(request).length > 0)
}

// Create Intern
const createIntern = async function (req, res) {
    try {

        const internData = req.body
        const { name, email, mobile, collegeId } = internData

        if (!isValidRequestBody(internData)) return res.status(400).send({ status: false, message: "No input by user.." })

        if (!isValid(name)) return res.status(400).send({ status: false, message: "Intern's name is required." })
        if (!isValid(email)) return res.status(400).send({ status: false, message: "Intern's email id is required." })
        if (!isValid(mobile)) return res.status(400).send({ status: false, message: "Intern's mobile no is required." })
        if (!isValid(collegeId)) return res.status(400).send({ status: false, message: "Intern's college id is required." })

        if (!nameRegex.test(name)) return res.status(400).send({ status: false, message: "Not a valid name." })
        if (!emailRegex.test(email)) return res.status(400).send({ status: false, message: "Please provide a valid email." })
        if (!mobileRegex.test(mobile)) return res.status(400).send({ status: false, message: "Please provide a valid mobile no." })
        if (!ObjectId.isValid(collegeId)) return res.status(400).send({ status: false, message: "Please provide a valid College Id." })

        const usedEmail = await internModel.findOne({ email })
        if (usedEmail) return res.status(400).send({ status: false, message: "Email id already exists. Please use another email id." })

        const usedMobile = await internModel.findOne({ mobile })
        if (usedMobile) return res.status(400).send({ status: false, message: "Mobile no already exists. Please use another mobile no.." })

        const findCollege = await collegeModel.findById(collegeId)
        if (!findCollege) return res.status(404).send({ status: false, message: "College not Found." })

        const newIntern = await internModel.create(internData)
        res.status(201).send({ status: true, message: "Internship application successful.", data: newIntern })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}

module.exports.createIntern = createIntern