const userModel = require("../models/userModel")
const validator = require("validator")
const Validation = require("../validator/validation")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const createUser = async function (req, res) {
    try {
        let data = req.body

        const { fname, lname, email, profileImage, phone, password, address, } = data

        if (!Validation.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "please provide some data" })
        }

        if (!fname) {
            return res.status(400).send({ status: false, msg: "please provide fname." })
        }

        if (!Validation.isValid(fname)) {
            return res.status(400).send({ status: false, msg: "please provide valid fname." })
        }

        if (!lname) {
            return res.status(400).send({ status: false, msg: "please provide lname." })
        }

        if (!Validation.isValid(lname)) {
            return res.status(400).send({ status: false, msg: "please provide valid lname." })
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "please provide email address." })
        }

        if (!Validation.isValid(email)) {
            return res.status(400).send({ status: false, msg: "please provide valid email address." })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send({ status: false, msg: "please provide a valid email address." })
        }

        const uniqueEmail = await userModel.findOne({ email: email })

        if (uniqueEmail) {
            return res.status(400).send({ status: false, msg: "email address already registered." })
        }

        // if (!profileImage) {
        //     return res.status(400).send({ status: false, msg: "please provide profileImage." })
        // }

        if (!phone) {
            return res.status(400).send({ status: false, msg: "please provide phone number." })
        }

        if (!validator.isNumeric(phone)) {
            return res.status(400).send({ status: false, msg: "please provide valid phone number." })  // test with indian number
        }

        if (phone.length != 10) {
            return res.status(400).send({ status: false, msg: "please provide valid 10 digit phone number." })
        }

        const uniquePhone = await userModel.findOne({ phone: phone })

        if (uniquePhone) {
            return res.status(400).send({ status: false, msg: "Phone Number already registered." })
        }


        if (!password) {
            return res.status(400).send({ status: false, msg: "please provide password." })
        }

        if (!Validation.isValid(password)) {
            return res.status(400).send({ status: false, msg: "please provide valid password." })
        }

        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, msg: "The length of password should be between 8 and 15" })
        }

        bcrypt.hash('password', 10, function (err, hash) {
            // Store hash
        });



        if (!address) {
            return res.status(400).send({ status: false, msg: "please provide address" })
        }

        
        if (!Validation.isValid(address)) {
            return res.status(400).send({ status: false, msg: "please provide valid address." })
        }

        
        if (!address.shipping) {
            return res.status(400).send({ status: false, msg: "please provide shipping details" })
        }


        if (!Validation.isValid(address.shipping)) {
            return res.status(400).send({ status: false, msg: "please provide valid address." })
        }


        if (!address.shipping.street) {
            return res.status(400).send({ status: false, msg: "please provide shipping street details" })
        }

        
        if (!Validation.isValid(address.shipping.street)) {
            return res.status(400).send({ status: false, msg: "please provide valid shipping street address." })
        }

        if (!address.shipping.city) {
            return res.status(400).send({ status: false, msg: "please provide shipping city details" })
        }


        if (!Validation.isValid(address.shipping.city)) {
            return res.status(400).send({ status: false, msg: "please provide valid shipping city address." })
        }

        if (!address.shipping.pincode) {
            return res.status(400).send({ status: false, msg: "please provide shipping pincode details" })
        }

        if (!Validation.isValid(address.shipping.pincode)) {
            return res.status(400).send({ status: false, msg: "please provide valid shipping pincode address." })
        }

        // if (!/^[1-9][0-9]{5}$/.test(address.billing.pincode)) {
        //     return res.status(400).send({ status: false, msg: "please provide a 6 digit pincode" })
        // }


        if (!(address.shipping.pincode).length == 6 ) {
            return res.status(400).send({ status: false, msg: "please provide valid 6 digit pincode ." })
        }

       

        if (!address.billing) {
            return res.status(400).send({ status: false, msg: "please provide billing details" })
        }


        if (!Validation.isValid(address.billing)) {
            return res.status(400).send({ status: false, msg: "please provide valid billing address." })
        }


        if (!address.billing.street) {
            return res.status(400).send({ status: false, msg: "please provide billing street details" })
        }

        
        if (!Validation.isValid(address.billing.street)) {
            return res.status(400).send({ status: false, msg: "please provide valid billing street address." })
        }

        if (!address.billing.city) {
            return res.status(400).send({ status: false, msg: "please provide city details for billing" })
        }


        if (!Validation.isValid(address.billing.city)) {
            return res.status(400).send({ status: false, msg: "please provide valid city address for billing." })
        }

        if (!address.billing.pincode) {
            return res.status(400).send({ status: false, msg: "please provide billing pincode details" })
        }

        if (!Validation.isValid(address.billing.pincode)) {
            return res.status(400).send({ status: false, msg: "please provide valid billing pincode address." })
        }

        
        // if (!/^[1-9][0-9]{5}$/.test(address.billing.pincode)) {
        //     return res.status(400).send({ status: false, msg: "please provide a 6 digit pincode" })
        // }
    


        if (!(address.billing.pincode).length == 6 ) {
            return res.status(400).send({ status: false, msg: "please provide valid 6 digit pincode ." })
        }


        let allData= await userModel.create(data);
        return res.status(201).send({status:true, msg:"user created successfully..", msg2: allData})




    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports.createUser= createUser;
