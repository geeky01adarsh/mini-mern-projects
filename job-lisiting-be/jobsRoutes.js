const express = require("express");
const router = express.Router();
const jobsData = require("./jobData");

// Get all jobs with filtering options
router.get("/", (req, res) => {
    try {
        const { limit = 10, page = 1, sort, order = "asc" } = req.query;

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Sort if requested
        let sortedJobs = [...jobsData];
        if (sort && sortedJobs[0].hasOwnProperty(sort)) {
            sortedJobs.sort((a, b) => {
                if (order.toLowerCase() === "desc") {
                    return a[sort] > b[sort] ? -1 : 1;
                }
                return a[sort] < b[sort] ? -1 : 1;
            });
        }

        // Apply pagination
        const paginatedJobs = sortedJobs.slice(startIndex, endIndex);

        // Response with pagination info
        res.json({
            total: jobsData.length,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(jobsData.length / limit),
            data: paginatedJobs,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get job by ID
router.get("/:id", (req, res) => {
    try {
        const job = jobsData.find((job) => job.id === parseInt(req.params.id));

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get jobs by category
router.get("/category/:category", (req, res) => {
    try {
        const { category } = req.params;
        const filteredJobs = jobsData.filter(
            (job) => job.category.toLowerCase() === category.toLowerCase()
        );

        if (filteredJobs.length === 0) {
            return res
                .status(404)
                .json({ message: "No jobs found in this category" });
        }

        res.json(filteredJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
