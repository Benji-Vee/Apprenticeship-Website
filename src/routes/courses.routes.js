const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');

// Get all courses
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Get single course
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Create course
router.post('/', async (req, res, next) => {
    try {
        const { title, code, description, duration_weeks } = req.body;
        const result = await pool.query(
            'INSERT INTO courses (title, code, description, duration_weeks) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, code, description, duration_weeks]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Update course
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, code, description, duration_weeks } = req.body;
        const result = await pool.query(
            'UPDATE courses SET title = $1, code = $2, description = $3, duration_weeks = $4 WHERE id = $5 RETURNING *',
            [title, code, description, duration_weeks, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Delete course
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
