const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');

// Get all RTO courses
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT rc.*, r.name as rto_name, c.title as course_title 
            FROM rto_courses rc
            JOIN rtos r ON rc.rto_id = r.id
            JOIN courses c ON rc.course_id = c.id
            ORDER BY rc.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Get single RTO course
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT rc.*, r.name as rto_name, c.title as course_title 
            FROM rto_courses rc
            JOIN rtos r ON rc.rto_id = r.id
            JOIN courses c ON rc.course_id = c.id
            WHERE rc.id = $1
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'RTO course not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Create RTO course
router.post('/', async (req, res, next) => {
    try {
        const { rto_id, course_id, start_date, price } = req.body;
        const result = await pool.query(
            'INSERT INTO rto_courses (rto_id, course_id, start_date, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [rto_id, course_id, start_date, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Update RTO course
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rto_id, course_id, start_date, price } = req.body;
        const result = await pool.query(
            'UPDATE rto_courses SET rto_id = $1, course_id = $2, start_date = $3, price = $4 WHERE id = $5 RETURNING *',
            [rto_id, course_id, start_date, price, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'RTO course not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Delete RTO course
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM rto_courses WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'RTO course not found' });
        }
        
        res.json({ message: 'RTO course deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
