import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const { search } = req.query;
        let sql = 'SELECT * FROM customers';
        const params = [];

        if (search) { sql += ' WHERE name LIKE ? OR email LIKE ?'; params.push(`%${search}%`, `%${search}%`); }

        sql += ' ORDER BY created_at DESC';

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getById(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
        const [orders] = await pool.query('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC', [req.params.id]);
        res.json({ ...rows[0], orders });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
