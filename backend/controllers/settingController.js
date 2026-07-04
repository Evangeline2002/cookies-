import pool from '../config/db.js';

export async function get(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM website_settings WHERE id = 1');
        if (rows.length === 0) return res.status(404).json({ error: 'Settings not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function update(req, res) {
    try {
        const { site_name, tagline, contact_email, contact_phone, address, facebook_url, instagram_url, twitter_url } = req.body;
        let sql = 'UPDATE website_settings SET site_name=?, tagline=?, contact_email=?, contact_phone=?, address=?, facebook_url=?, instagram_url=?, twitter_url=?';
        const params = [site_name, tagline || null, contact_email, contact_phone || null, address || null, facebook_url || null, instagram_url || null, twitter_url || null];

        if (req.file) { sql += ', logo=?'; params.push(`/uploads/${req.file.filename}`); }

        sql += ' WHERE id=1';
        params.push();
        await pool.query(sql, params);

        const [rows] = await pool.query('SELECT * FROM website_settings WHERE id = 1');
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}
