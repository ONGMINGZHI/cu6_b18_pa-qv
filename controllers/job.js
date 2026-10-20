/*
    INSTRUCTION: setup the job controller with the following functions:
    - getJobs - Retrieve all jobs (use `populate()` to get employer details)
    - getJob - Retrieve a specific job (use `populate()` to get employer details)
    - addNewJob - Add a new job
    - updateJob - Update a job
    - deleteJob - Delete a job
*/
const Job = require("../models/job");
const Employer = require("../models/employer");

const getJobs = async (req, res) => {
    try {
        const {category} = req.query
        const filter = {};
        if (category && category !== "All") {
            filter.category = category;
        }
        const jobs = (await Job.find(filter).populate("employer"));
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("employer");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addNewJobs = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateJobs = async (req, res) => {
    try {
        if (req.body.employer && !(await Employer.exists({ _id: req.body.employer }))) {
            return res.status(400).json({ message: "Employer not found" });
        }
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate("employer");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJobs = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getJobs,
    getJob,
    addNewJobs,
    updateJobs,
    deleteJobs,
};
