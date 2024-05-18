const { Op } = require("sequelize");
const Job_Listing = require('../models/joblisting_model'); 
const Application_model = require('../models/applicationsmodel'); 

// Retrieve all job listing details
exports.getJobListingDetails = async () => {
    try {
        let job_listing_details = await Job_Listing.findAll();
        return job_listing_details; 
    } catch (error) {
        throw new Error(`Error in getJobListingDetails: ${error.message}`);
    }
};

// Create a new job listing
exports.postJobListing = async (jobdetails) => {
    try {
        await Job_Listing.create(jobdetails);
        return "Job listing details are inserted"; 
    } catch (error) {
        throw new Error(`Error in postJobListing: ${error.message}`);
    }
};

// Update a job listing
exports.updateJobListing = async (updatedetails) => {
    try {
        await Job_Listing.update(updatedetails, { where: { job_id: updatedetails.job_id } }); 
        return "Job listing details are updated"; 
    } catch (error) {
        throw new Error(`Error in updateJobListing: ${error.message}`);
    }
};

// Delete a job listing
exports.deleteJobListing = async (jobId) => {
    try {
        await Job_Listing.destroy({ where: { job_id: jobId } }); 
        return "Job listing deleted successfully"; 
    } catch (error) {
        throw new Error(`Error in deleteJobListing: ${error.message}`);
    }
};

// Read all applications
exports.viewApplications = async () => {
    try {
        let Application_details = await Application_model.findAll();
        return Application_details;
    } catch (error) {
        throw new Error(`Error in viewAllJobListing: ${error.message}`);
    }
};

// View a job listing by ID
exports.viewApplicationById = async (employeid) => {
    try {
        const Application = await Application_model.findAll({ where: { employer_id: employeid },order: [['status', 'ASC']] }); 
        if (Application) {
            return Application; // Return Application details if found
        } else {
            return "application not found"; // Return message if job not found
        }
    } catch (error) {
        throw new Error(`Error in viewJobListing: ${error.message}`);
    }
};
