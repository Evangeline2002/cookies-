import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM recipes ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getById(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Recipe not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function create(req, res) {
    try {
        const { title, author, description, ingredients, instructions, status } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const [result] = await pool.query('INSERT INTO recipes (title, author, description, ingredients, instructions, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, author || null, description || null, ingredients || null, instructions || null, image, status || 'Draft']);
        const [recipe] = await pool.query('SELECT * FROM recipes WHERE id = ?', [result.insertId]);
        res.status(201).json(recipe[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function update(req, res) {
    try {
        const { title, author, description, ingredients, instructions, status } = req.body;
        let sql = 'UPDATE recipes SET title=?, author=?, description=?, ingredients=?, instructions=?, status=?';
        const params = [title, author || null, description || null, ingredients || null, instructions || null, status || 'Draft'];
        if (req.file) { sql += ', image=?'; params.push(`/uploads/${req.file.filename}`); }
        sql += ' WHERE id=?';
        params.push(req.params.id);
        await pool.query(sql, params);
        const [recipe] = await pool.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
        res.json(recipe[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function remove(req, res) {
    try {
        await pool.query('DELETE FROM recipes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Recipe deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
