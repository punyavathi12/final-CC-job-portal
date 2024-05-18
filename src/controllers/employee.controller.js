const express = require("express");
const router = express.Router();
const { jobDataValidateForCreate, jobDataValidateForUpdate, jobDataValidateForDelete, viewApplicationvalidationByEmployeeId } = require('../middlewares/employe.middleware');
const { validationResult } = require('express-validator');
const authenticateToken = require('../middlewares/tokenvalidation');
const employeservices = require('../services/employer.service');
const logger = require('../utils/logging'); // Importing the logger module

router.get("/jobs",authenticateToken, async function(req, res) {
    try {
        const JobArray = await employeservices.getJobListingDetails();
        res.send(JobArray);
        logger.info("GET /jobs request successful"); // Log a successful GET request
    } catch (error) {
        console.error("Error in GET /jobs:", error);
        logger.error("Error in GET /jobs: " + error.message); // Log an error for GET request
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.post("/createjobbyemp",authenticateToken, jobDataValidateForCreate, async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in POST /createjobbyemp: " + JSON.stringify(formattedErrors));
            return res.status(400).json({ success: false, errors: formattedErrors }); // Return 400 for validation errors
        }
        
        const jobobj = req.body;
        const result = await employeservices.postJobListing(jobobj);
        if (!result.status) {
            console.error("Error in POST /createjobbyemp:", result.message);
            logger.error("Error in POST /createjobbyemp: " + result.message);
            return res.status(result.code || 500).json(result);
        }
        res.send(result); // Assuming successful result contains the created job data
    } catch (error) {
        console.error("Error in POST /createjobbyemp:", error);
        logger.error("Error in POST /createjobbyemp: " + error.message);
        return res.status(500).json({ success: false, error: "Internal server error" }); // Return 500 for other errors
    }
});

router.put("/updatejobbyemp/:id",authenticateToken,  jobDataValidateForUpdate, async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in PUT /updatejobbyemp/:id: " + JSON.stringify(formattedErrors)); // Log validation errors
            return res.status(400).json({ success: false, errors: formattedErrors }); // Return 400 for validation errors
        }

        var empobj = {
            job_id: parseInt(req.params.id),
            job_title: req.body.job_title,
            job_industry: req.body.job_industry,
            description: req.body.description,
            qualifications: req.body.qualifications,
            application_instructions: req.body.application_instructions,
            created_by: req.body.created_by,
            location: req.body.location,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary,
            company_name: req.body.company_name,
            job_status: req.body.job_status
        };

        let updatedresult = await employeservices.updateJobListing(empobj);

        if (updatedresult.status == false) {
            console.error("Error in PUT /updatejobbyemp/:id:", updatedresult.message);
            logger.error("Error in PUT /updatejobbyemp/:id: " + updatedresult.message); // Log an error for PUT request
            return res.status(500).json(updatedresult);
        }

        res.send(updatedresult);
        logger.info("PUT /updatejobbyemp/:id request successful"); // Log a successful PUT request
    } catch (error) {
        console.error("Error in PUT /updatejobbyemp/:id:", error);
        logger.error("Error in PUT /updatejobbyemp/:id: " + error.message); // Log an error for PUT request
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.delete("/deletejobbyemp/:id",authenticateToken,  jobDataValidateForDelete, async function(req, res) {
    try {
        var jobId = req.params.id;
        let deletedresult = await employeservices.deleteJobListing(jobId);
        if (deletedresult.status == true) {
            res.send(deletedresult);
            logger.info("DELETE /deletejobbyemp/:id request successful"); // Log a successful DELETE request
        } else {
            res.status(422).json(deletedresult);
            logger.error("Error in DELETE /deletejobbyemp/:id: " + deletedresult.message); // Log an error for DELETE request
        }
    } catch (error) {
        console.error("Error in DELETE /deletejobbyemp/:id:", error);
        logger.error("Error in DELETE /deletejobbyemp/:id: " + error.message); // Log an error for DELETE request
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.get("/applications",authenticateToken, async function(req, res) {
    try {
        let emparray = await employeservices.viewApplications();
        console.log("[GET ALL] No. of applications : " + emparray.length);
        res.send(emparray);
        logger.info("GET /application request successful"); // Log a successful GET request
    } catch (error) {
        console.error("Error in GET /application:", error);
        logger.error("Error in GET /application: " + error.message); // Log an error for GET request
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.get("/applicationByemp/:id" , authenticateToken,viewApplicationvalidationByEmployeeId, async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
            console.error("Validation errors:", formattedErrors);
            logger.warn("Validation errors in GET /applicationByemp/:id: " + JSON.stringify(formattedErrors)); // Log validation errors
            return res.status(422).json({ success: false, errors: formattedErrors });
        }
        var employeid = req.params.id;
        let empobj = await employeservices.viewApplicationById(employeid);
        res.send(empobj);
        logger.info("GET /applicationByemp/:id request successful"); // Log a successful GET request
    } catch (error) {
        console.error("Error in GET /applicationByemp/:id:", error);
        logger.error("Error in GET /applicationByemp/:id: " + error.message); // Log an error for GET request
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
