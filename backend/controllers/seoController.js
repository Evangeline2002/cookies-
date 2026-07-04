import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM seo_settings ORDER BY page');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function update(req, res) {
    try {
        const { meta_title, meta_description, keywords, canonical_url } = req.body;
        await pool.query('UPDATE seo_settings SET meta_title=?, meta_description=?, keywords=?, canonical_url=? WHERE id=?',
            [meta_title || null, meta_description || null, keywords || null, canonical_url || null, req.params.id]);
        const [setting] = await pool.query('SELECT * FROM seo_settings WHERE id = ?', [req.params.id]);
        res.json(setting[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}
