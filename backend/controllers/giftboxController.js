import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM gift_boxes ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getById(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM gift_boxes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Gift box not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function create(req, res) {
    try {
        const { name, description, items, price, status } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const [result] = await pool.query('INSERT INTO gift_boxes (name, description, items, price, image, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description || null, items || 0, price, image, status || 'Active']);
        const [box] = await pool.query('SELECT * FROM gift_boxes WHERE id = ?', [result.insertId]);
        res.status(201).json(box[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function update(req, res) {
    try {
        const { name, description, items, price, status } = req.body;
        let sql = 'UPDATE gift_boxes SET name=?, description=?, items=?, price=?, status=?';
        const params = [name, description || null, items || 0, price, status || 'Active'];
        if (req.file) { sql += ', image=?'; params.push(`/uploads/${req.file.filename}`); }
        sql += ' WHERE id=?';
        params.push(req.params.id);
        await pool.query(sql, params);
        const [box] = await pool.query('SELECT * FROM gift_boxes WHERE id = ?', [req.params.id]);
        res.json(box[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function remove(req, res) {
    try {
        await pool.query('DELETE FROM gift_boxes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Gift box deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
