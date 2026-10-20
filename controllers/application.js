/*
    INSTRUCTION: setup the controller functions to handle job applications
    - getApplicationsByJob - Retrieve all applications for a specific job (use `populate()` to get job details)
    - createApplication - Create a new application for a job (ensure no duplicate applications for the same email and job)
*/
const Application = require("../models/application");
const Job =require("../models/job")

const getApplications = async (req, res) => {
    const {job_id} = req.query
    try {
        const Applications = await Application.find(job_id).populate("job");
        res.status(200).json(Applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addNewApplications = async (req, res) => {
    const {job, applicantName, email, phone}=req.body

    if (!job || !applicantName || !email ||!phone) {
            return res.status(400).json({ message: "Job, Applicant Name, Email and Phone are required." });
        }
    try {
        if (req.body.job && !(await Job.exists({ _id: req.body.job }))) {
            return res.status(400).json({ message: "Job not found" });
        }
        const applications = await Application.create(req.body);
        res.status(201).json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getApplications,
    addNewApplications
};
