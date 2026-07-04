import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const { status } = req.query;
        let sql = 'SELECT * FROM reviews';
        const params = [];

        if (status) { sql += ' WHERE status = ?'; params.push(status); }

        sql += ' ORDER BY created_at DESC';

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function updateStatus(req, res) {
    try {
        const { status } = req.body;
        await pool.query('UPDATE reviews SET status = ? WHERE id = ?', [status, req.params.id]);
        const [review] = await pool.query('SELECT * FROM reviews WHERE id = ?', [req.params.id]);
        res.json(review[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function remove(req, res) {
    try {
        await pool.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
        res.json({ message: 'Review deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
