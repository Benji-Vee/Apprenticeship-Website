const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');

// Get all RTOs
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM rtos ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Get single RTO
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM rtos WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'RTO not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Create RTO
router.post('/', async (req, res, next) => {
    try {
        const { name, code, location } = req.body;
        const result = await pool.query(
            'INSERT INTO rtos (name, code, location) VALUES ($1, $2, $3) RETURNING *',
            [name, code, location]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Update RTO
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, code, location } = req.body;
        const result = await pool.query(
            'UPDATE rtos SET name = $1, code = $2, location = $3 WHERE id = $4 RETURNING *',
            [name, code, location, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'RTO not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Delete RTO
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM rtos WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'RTO not found' });
        }
        
        res.json({ message: 'RTO deleted successfully' });
    } catch (err) {
        next(err);
    }
});

const routerExport = router;
module.exports = routerExport; ;



// empty line
