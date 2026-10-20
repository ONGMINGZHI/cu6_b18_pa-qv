/*
    INSTRUCTION: setup the employer controller with the following functions:
    - getEmployers - Retrieve all employers
    - getEmployer - Retrieve a specific employer
    - addNewEmployer - Add a new employer
    - updateEmployer - Update an employer
    - deleteEmployer - Delete an employer
*/
const Employer = require("../models/employer");

const getEmployers = async (req, res) => {
    try {
        const employers = await Employer.find();
        res.status(200).json(employers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEmployer = async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id);
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.status(200).json(employer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addNewEmployers = async (req, res) => {
    try {
        const newEmployer = new Employer(req.body)
    await newEmployer.save()
    res.status(201).json(newEmployer)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployers = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.status(200).json(employer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteEmployers = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndDelete(req.params.id);
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.status(200).json({ message: "Employer deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getEmployers,
    getEmployer,
    addNewEmployers,
    updateEmployers,
    deleteEmployers,
};
