const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db.config');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection test middleware
app.use(async (req, res, next) => {
    try {
        await pool.query('SELECT 1');
        next();
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({
            success: false,
            message: 'Database connection error'
        });
    }
});

// Basic test route
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint working' });
});

// Direct API routes (temporary until route files are set up)
app.get('/api/skills', async (req, res) => {
    try {
        console.log('Attempting to fetch skills...');
        const result = await pool.query('SELECT * FROM skills ORDER BY title');
        res.json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Error fetching skills:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills',
            error: err.message
        });
    }
});

app.get('/api/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses ORDER BY title');
        res.json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: err.message
        });
    }
});

app.get('/api/rtos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rtos ORDER BY name');
        res.json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error('Error fetching RTOs:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching RTOs',
            error: err.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const startServer = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Database connection successful');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
};

startServer();