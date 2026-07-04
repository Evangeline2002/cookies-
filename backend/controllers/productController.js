import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const { search, category, status } = req.query;
        let sql = 'SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
        const params = [];

        if (search) { sql += ' AND p.name LIKE ?'; params.push(`%${search}%`); }
        if (category) { sql += ' AND p.category_id = ?'; params.push(category); }
        if (status) { sql += ' AND p.status = ?'; params.push(status); }

        sql += ' ORDER BY p.created_at DESC';

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getById(req, res) {
    try {
        const [rows] = await pool.query('SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function create(req, res) {
    try {
        const { name, category_id, description, price, original_price, stock, status, featured } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const [result] = await pool.query(
            'INSERT INTO products (name, category_id, description, price, original_price, stock, image, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, category_id || null, description || null, price, original_price || null, stock || 0, image, status || 'Active', featured || false]
        );
        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
        res.status(201).json(product[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function update(req, res) {
    try {
        const { name, category_id, description, price, original_price, stock, status, featured } = req.body;
        let sql = 'UPDATE products SET name=?, category_id=?, description=?, price=?, original_price=?, stock=?, status=?, featured=?';
        const params = [name, category_id || null, description || null, price, original_price || null, stock || 0, status || 'Active', featured || false];

        if (req.file) {
            sql += ', image=?';
            params.push(`/uploads/${req.file.filename}`);
        }

        sql += ' WHERE id=?';
        params.push(req.params.id);

        await pool.query(sql, params);
        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        res.json(product[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function remove(req, res) {
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
