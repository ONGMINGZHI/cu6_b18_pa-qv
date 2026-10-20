/*
    INSTRUCTION: setup the job routes according to the following requirements:
    - `GET /jobs`: List all jobs with sorting, pagination and filtering
    - `GET /jobs/:id`: Get a specific job by its id
    - `POST /jobs`: Add a new job
    - `PUT /jobs/:id`: Update a job
    - `DELETE /jobs/:id`: Delete a job
*/
const express = require("express");
const {
    getJobs,
    getJob,
    addNewJobs,
    updateJobs,
    deleteJobs,
} = require("../controllers/job");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", addNewJobs);
router.put("/:id", updateJobs);
router.delete("/:id", deleteJobs);

module.exports = router;
