const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Assuming your Express app is exported from index.js
const should = chai.should();

chai.use(chaiHttp);

describe('Employee API Testing', () => {
    describe('GET /jobs', () => {
        it('should return all job listings', (done) => {
            chai.request(app)
                .get('/empapi/jobs')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        done();
                    }
                });
        });
    });

    describe('POST /createjobbyemp', () => {
        it('should create a new job listing with valid data', (done) => {
            const validJobData = {
                "job_title": "Data Analyst",
                "job_industry": "NON-IT",
                "description": "we are looking for fresher",
                "qualifications": "BE/B.tech",
                "application_instructions": "none",
                "created_by": 102,
                "location": "hyd",
                "min_salary": 450000,
                "max_salary": 650000,
                "company_name": "tcs",
                "job_status": "open"
            };
            chai.request(app)
                .post('/empapi/createjobbyemp')
                .send(validJobData)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(200);
                        res.body.should.have.property('success').to.equal(true);
                        done();
                    }
                });
        });

        it('should return validation error for invalid job data', (done) => {
            const invalidJobData = {
                "job_title": "Data Analyst",
                "job_industry": "",
                "description": "we are looking for fresher",
                "qualifications": "BE/B.tech",
                "application_instructions": "none",
                "created_by": 102,
                "location": "hyd",
                "min_salary": 450000,
                "max_salary": 650000,
                "company_name": "tcs",
                "job_status": "open"
            };
            chai.request(app)
                .post('/empapi/createjobbyemp')
                .send(invalidJobData)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(422);
                        res.body.should.have.property('success').to.equal(false);
                        res.body.should.have.property('errors').to.be.an('array');
                        done();
                    }
                });
        });
    });

    describe('PUT /updatejobbyemp/:id', () => {
        it('should update an existing job listing with valid data', (done) => {
            const jobId = 1003; // ID of the job to update
            const updatedJobData = {
                "job_id": 1003,
                "job_title": "mernstack developer",
                "job_industry": "IT",
                "description": "we are looking for fresher",
                "qualifications": "BE/B.tech",
                "application_instructions": "none",
                "created_by": 102,
                "location": "hyd",
                "min_salary": 450000,
                "max_salary": 650000,
                "company_name": "wipro",
                "job_status": "closed"
            };
            chai.request(app)
                .put(`/empapi/updatejobbyemp/${jobId}`)
                .send(updatedJobData)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(200);
                        res.body.should.have.property('success').to.equal(true);
                        done();
                    }
                });
        });

        it('should return validation error for invalid job data', (done) => {
            const jobId = 1003; // ID of the job to update
            const invalidJobData = {
                "job_id": 1003,
                "job_title": "mernstack developer",
                "job_industry": "IT",
                "description": "we are looking for fresher",
                "qualifications": "BE/B.tech",
                "application_instructions": "none",
                "created_by": 102,
                "location": "hyd",
                "min_salary": 450000,
                "max_salary": 650000,
                "company_name": "wipro",
                "job_status": "closed"
            };
            chai.request(app)
                .put(`/empapi/updatejobbyemp/${jobId}`)
                .send(invalidJobData)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(422);
                        res.body.should.have.property('success').to.equal(false);
                        res.body.should.have.property('errors').to.be.an('array');
                        done();
                    }
                });
        });
    });

    describe('DELETE /deletejobbyemp/:id', () => {
        it('should delete an existing job listing', (done) => {
            const jobId = 1004; // ID of the job to delete
            chai.request(app)
                .delete(`/empapi/deletejobbyemp/${jobId}`)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(200);
                        res.body.should.have.property('success').to.equal(true);
                        done();
                    }
                });
        });
    });

    describe('GET /applications', () => {
        it('should return all job applications', (done) => {
            chai.request(app)
                .get('/empapi/applications')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        done();
                    }
                });
        });
    });

    describe('GET /applicationByemp/:id', () => {
        it('should return job applications by employee ID', (done) => {
            const employeeId = 100; // ID of the employee
            chai.request(app)
                .get(`/empapi/applicationByemp/${employeeId}`)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done(err);
                    } else {
                        console.log(res.body); // Log response body for debugging
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        done();
                    }
                });
        });
    });
});
