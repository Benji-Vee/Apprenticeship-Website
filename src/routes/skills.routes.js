const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');

// Get all skills
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM skills ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Get single skill
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM skills WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Create skill
router.post('/', async (req, res, next) => {
    try {
        const { name, description, course_id } = req.body;
        const result = await pool.query(
            'INSERT INTO skills (name, description, course_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, course_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Update skill
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, course_id } = req.body;
        const result = await pool.query(
            'UPDATE skills SET name = $1, description = $2, course_id = $3 WHERE id = $4 RETURNING *',
            [name, description, course_id, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Delete skill
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        res.json({ message: 'Skill deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
