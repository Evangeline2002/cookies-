import bcrypt from 'bcryptjs';
import pool from './config/db.js';

async function seed() {
    try {
        console.log('Seeding database...');

        const [exists] = await pool.query('SELECT COUNT(*) AS count FROM admins');
        if (exists[0].count > 0) {
            console.log('Admin already exists, skipping seed.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        await pool.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
            ['Admin', 'admin@cookieheaven.com', hashedPassword]);

        console.log('Admin seeded: admin@cookieheaven.com / admin123');
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err.message);
        process.exit(1);
    }
}

seed();
