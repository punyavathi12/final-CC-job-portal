const { body } = require('express-validator');
const { param } = require('express-validator');


const joblisting_model = require('..//models/joblisting_model');

async function checkJobId(jobid) {
    try {
        let jobListingArr = await joblisting_model.findAll({
            where: { job_id: jobid }
        });
        console.log(jobListingArr);
        if (jobListingArr.length != 0) {
            console.log("inside");
            return true;    
            //returns true if job already exists.
        }
        return false;

    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }

}

const jobDataValidateForCreate = [
    body("job_title")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Job title is required"),

    body("description")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),

    body("qualifications")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Qualifications are required"),

    body("application_instructions")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Application instructions are required"),

    body("created_by")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid created_by value"),

    body("location")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Location is required"),

    body("min_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Minimum salary must be a valid decimal number"),

    body("max_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Maximum salary must be a valid decimal number"),

    body("company_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Company name is required"),

    body("job_status")
    .trim()
    .isIn(['open', 'closed'])
    .withMessage("Job status must be 'open' or 'closed'")
    .optional({ nullable: true }),
];
const jobDataValidateForUpdate = [
    body("job_id")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid job_id")
        .custom((value, { req }) => {
            return checkJobId(value);
        }),
    body("job_title")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Job title is required"),

    body("description")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),

    body("qualifications")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Qualifications are required"),

    body("application_instructions")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Application instructions are required"),

    body("created_by")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid created_by value"),

    body("location")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Location is required"),

    body("min_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Minimum salary must be a valid decimal number"),

    body("max_salary")
        .trim()
        .isDecimal({ decimal_digits: '1,2' })
        .withMessage("Maximum salary must be a valid decimal number"),

    body("company_name")
        .trim()
        .exists({ checkFalsy: true })
        .withMessage("Company name is required"),
    body("job_status")
        .trim()
        .isIn(['open', 'closed'])
        .withMessage("Job status must be 'open' or 'closed'")
        .optional({ nullable: true }),
];

const jobDataValidateForDelete = [
    param("jobId")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Invalid jobId"),
];

const viewApplicationvalidationByEmployeeId = [
    param('employeid')
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid employeId')
];

module.exports = {
     jobDataValidateForCreate ,
     jobDataValidateForUpdate ,
     jobDataValidateForDelete ,
     viewApplicationvalidationByEmployeeId
    };