import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const [rows] = await pool.query('SELECT c.*, (SELECT COUNT(*) FROM products WHERE category_id = c.id) AS product_count FROM categories c ORDER BY c.name');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getById(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Category not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function create(req, res) {
    try {
        const { name, status } = req.body;
        if (!name) return res.status(400).json({ error: 'Category name is required' });
        const [result] = await pool.query('INSERT INTO categories (name, status) VALUES (?, ?)', [name, status || 'Active']);
        const [cat] = await pool.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
        res.status(201).json(cat[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function update(req, res) {
    try {
        const { name, status } = req.body;
        await pool.query('UPDATE categories SET name=?, status=? WHERE id=?', [name, status, req.params.id]);
        const [cat] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        res.json(cat[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function remove(req, res) {
    try {
        await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
