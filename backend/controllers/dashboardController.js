import pool from '../config/db.js';

export async function getStats(req, res) {
    try {
        const [productCount] = await pool.query('SELECT COUNT(*) AS count FROM products');
        const [orderCount] = await pool.query('SELECT COUNT(*) AS count FROM orders');
        const [customerCount] = await pool.query('SELECT COUNT(*) AS count FROM customers');
        const [revenueResult] = await pool.query('SELECT COALESCE(SUM(total_amount), 0) AS total FROM orders WHERE status != "Cancelled"');
        const [recentOrders] = await pool.query('SELECT id, order_number, customer_name, total_amount, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5');
        const [recentCustomers] = await pool.query('SELECT id, name, email, total_orders, created_at FROM customers ORDER BY created_at DESC LIMIT 5');
        const [latestReviews] = await pool.query('SELECT id, customer_name, product_name, rating, comment, status, created_at FROM reviews ORDER BY created_at DESC LIMIT 5');
        const [bestSellers] = await pool.query('SELECT oi.product_name, SUM(oi.quantity) AS total_qty, SUM(oi.price * oi.quantity) AS total_revenue FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.status != "Cancelled" GROUP BY oi.product_name ORDER BY total_qty DESC LIMIT 5');
        const [monthlyOrders] = await pool.query('SELECT DATE_FORMAT(created_at, "%Y-%m") AS month, COUNT(*) AS count, COALESCE(SUM(total_amount), 0) AS revenue FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH) AND status != "Cancelled" GROUP BY month ORDER BY month');

        res.json({
            totalProducts: productCount[0].count,
            totalOrders: orderCount[0].count,
            totalCustomers: customerCount[0].count,
            totalRevenue: revenueResult[0].total,
            recentOrders,
            recentCustomers,
            latestReviews,
            bestSellers,
            monthlyOrders
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
