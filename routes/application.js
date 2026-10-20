/*
    INSTRUCTION: This file defines the routes for managing job applications.
    - `GET /applications?job=xxx`: Get all applications for a specific job
    - `POST /applications`: Create a new application for a job
*/
const express = require("express");
const {
    getApplications,
    addNewApplications,
} = require("../controllers/application");

const router = express.Router();

router.get("/", getApplications);
router.post("/", addNewApplications);

module.exports = router;
