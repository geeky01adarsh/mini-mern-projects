const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const jobRoutes = require("./jobsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS configuration - Allow requests from any origin
app.use(
    cors({
        origin: "*",
        methods: ["GET"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Rate limiter: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        message: "Too many requests, please try again later.",
    },
});

// Apply rate limiting to all routes
app.use(limiter);

// Routes
app.use("/api/jobs", jobRoutes);

// Documentation route
app.get("/", (req, res) => {
    res.send(`
    <h1>Job Portal API Documentation</h1>
    <h2>Available Endpoints:</h2>
    <ul>
      <li><strong>GET /api/jobs</strong> - Get all jobs with optional filtering</li>
      <li><strong>GET /api/jobs/:id</strong> - Get a specific job by ID</li>
      <li><strong>GET /api/jobs/category/:category</strong> - Get jobs by category</li>
    </ul>
    <h2>Query Parameters for /api/jobs:</h2>
    <ul>
      <li><strong>limit</strong> - Number of results to return (default: 10)</li>
      <li><strong>page</strong> - Page number for pagination (default: 1)</li>
      <li><strong>sort</strong> - Sort by field (e.g., 'postedAt' or 'salary')</li>
      <li><strong>order</strong> - Sort order ('asc' or 'desc')</li>
    </ul>
    <h2>Rate Limiting:</h2>
    <p>API is rate limited to 100 requests per 15 minutes per IP address.</p>
  `);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Resource not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
