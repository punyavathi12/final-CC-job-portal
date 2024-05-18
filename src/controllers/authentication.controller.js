const express = require("express");
const auth_router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { adminDataValidateForLogin, adminDataValidateForCreate } = require('../middlewares/admin.middleware');
const { validationResult } = require('express-validator');
const adminModel = require('..//models/admin_model');
const adminservices = require("../services/admin_services");
require('dotenv').config();
const logger = require('../utils/logging');

auth_router.post("/adminRegister", adminDataValidateForCreate, async (req, res) => {
    // Extracts the validation errors of an express request
    try {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            logger.error({ label: 'Controller', message: formattedErrors });
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let adminObj = {
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number
        }

        let result = await adminservices.createadmin(adminObj);
        if (result.status == false) {
            return res.status(result.code).json(result);
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

});
auth_router.post("/adminLogin", adminDataValidateForLogin, async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = [];
            errors.array().map(err => formattedErrors.push({ [err.path]: err.msg }));
            return res.status(422).json({
                success: false,
                errors: formattedErrors
            });
        }

        let result = await adminModel.findAll({ where: { email: req.body.email } });

        // verify credentials, generate the token and send the token to client
        if (result.length != 0) {
            const adminObj = {};
            for (let item of result) {
                adminObj.admin_id = item.admin_id;
                adminObj.email = item.email;
                adminObj.password = item.password;
            }
            const isPasswordValid = await bcrypt.compare(req.body.password, adminObj.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const JWTToken = jwt.sign({ adminId: adminObj.admin_id }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
            return res.status(200).json({ success: true, token: JWTToken });
        }
        else {
            return res.status(401).json({ success: false, message: "Invalid User email" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = auth_router;