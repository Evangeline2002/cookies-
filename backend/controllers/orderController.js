import pool from '../config/db.js';

export async function getAll(req, res) {
    try {
        const { search, status } = req.query;
        let sql = 'SELECT * FROM orders WHERE 1=1';
        const params = [];

        if (search) { sql += ' AND (order_number LIKE ? OR customer_name LIKE ? OR customer_email LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
        if (status && status !== 'All') { sql += ' AND status = ?'; params.push(status); }

        sql += ' ORDER BY created_at DESC';

        const [rows] = await pool.query(sql, params);

        const ordersWithItems = await Promise.all(rows.map(async (order) => {
            const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
            return { ...order, items };
        }));

        res.json(ordersWithItems);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getById(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
        res.json({ ...rows[0], items });
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function updateStatus(req, res) {
    try {
        const { status } = req.body;
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        const [order] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        res.json(order[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function remove(req, res) {
    try {
        await pool.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
        res.json({ message: 'Order deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
