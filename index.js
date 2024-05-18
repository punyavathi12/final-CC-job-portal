const express = require("express");
var bodyParser = require("body-parser");
const emprouter = require('./src/controllers/employee.controller');
const adminrouter = require('./src/controllers/authentication.controller')
const dateTime = require('./src/utils/dateTimeUtil');
const logger = require('./src/utils/logging');
// create express application object 
const app = express();

app.use((req, res, next) => 
    {
        let d = new Date();
        console.log("Request arrived to server at : " +  dateTime.getTimeStamp(d)); 
        next();
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/", deptRouter);
// app.use("/route_prefix", deptRouter);
app.use("/adminapi",adminrouter);
app.use("/empapi", emprouter);


// default request
app.get("/", function(req,res)  
{
    logger.info("Authentication API Development using Express JS")
    let resultStr  = "<h1 align='center'>Welcome to Career Crafter - The job Portal <h1/>";
    res.send(resultStr);
});

app.listen(3002, function() { });
console.log("Server Application is started. Url : http://localhost:3002");


module.exports = app;














/*// Import the employer service
const employerservice = require('./src/services/employer.service');

async function main() {

    const jobDetails = {
        job_title: "Software Engineer",
        job_industry:"it",
        description: "We are looking for a skilled software engineer...",
        qualifications: "BE/B.tech",
        application_instructions: "none",
        created_by: 100,
        location: "chennai",
        min_salary: 400000, 
        max_salary: 600000,
        company_name: "hexaware" ,
        job_status:"open"
    };

    // Post a job listing
    const status = await employerservice.postJobListing(jobDetails);
    console.log(status);

    // Update a job listing
    const job_id_to_update = 1000;
    const updatedDetails = {
        job_title: "Senior Software Engineer",
        job_industry:"it",
        description: "We are looking for an experienced senior software engineer...",
        qualifications: "BE/B.tech with 5+ years experience",
        application_instructions: "Please send your resume to hr@hexaware.com",
        location: "Chennai",
        min_salary: 600000,
        max_salary: 900000,
        company_name: "Hexaware Technologies" ,
        job_status:"open"
    };
    const updateStatus = await employerservice.updateJobListing(job_id_to_update, updatedDetails);
    console.log(updateStatus);

    // Delete a job listing
    const job_id_to_delete = 1001;
    const deleteStatus = await employerservice.deleteJobListing(job_id_to_delete);
    console.log(deleteStatus);

    // View applications for a job listing

    const allapplications = await employerservice.viewJobListingAll();
    console.log("All Applications viewed successfully:", allapplications);

    const job_id_to_view = 1000;
    const applications = await employerservice.viewJobListing(job_id_to_view);
    console.log("Applications viewed successfully:", applications);
}

main();*/















/*const employerservice = require('./src/services/employer.service');

async function main() {

    const jobDetails = {
        job_title: "Software Engineer",
        //admin_id: 132,
        description: "We are looking for a skilled software engineer...",
        qualifications: "BE/B.tech",
        application_instructions: "none",
        created_by: 100,
        location: "chennai",
        min_Salary: 400000,
        max_salary: 600000,
        Company_name: "hexaware"
    };
    const status = await employerservice.postJobListing(jobDetails);
    console.log(status);

    // Post a job listing
    /*let status="";
    status=*///await employerservice.postJobListing(jobDetails);
    //console.log("Job listing posted successfully:", jobDetails.job_title, jobDetails.description, jobDetails.qualifications, jobDetails.application_instructions, jobDetails.created_by, jobDetails.location, jobDetails.min_Salary, jobDetails.max_salary, jobDetails.Company_name);
    //console.log(status);
    // Update a job listing
    /*const job_id_to_update = 1000;
    const updatedDetails = {
        job_title: "Senior Software Engineer",
        description: "We are looking for an experienced senior software engineer...",
        qualifications: "BE/B.tech with 5+ years experience",
        application_instructions: "Please send your resume to hr@hexaware.com",
        location: "Chennai",
        min_Salary: 600000,
        max_salary: 900000,
        Company_name: "Hexaware Technologies"
    };
    await employerservice.JobListing(job_id_to_update, updatedDetails);
    console.log("Job listing updated successfully:", updatedDetails);

    // Delete a job listing
    const job_id_to_delete = 1001;
    await employerservice.deleteJobListing(job_id_to_delete);
    console.log("Job listing deleted successfully:", job_id_to_delete);

    // View applications for a job listing
    const job_id_to_view = 1000;
    const applications = await employerservice.viewApplications(job_id_to_view);
    console.log("Applications viewed successfully:", applications);
}

main();*/
