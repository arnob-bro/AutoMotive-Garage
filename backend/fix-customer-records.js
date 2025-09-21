// Fix script to ensure customer records exist for all users
// Run with: node fix-customer-records.js

const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool_mode: process.env.DB_POOL_MODE,
  ssl: { rejectUnauthorized: false },
});

async function fixCustomerRecords() {
  console.log('🔧 Fixing customer records...\n');

  try {
    // Get all users who don't have corresponding customer records
    const usersWithoutCustomers = await db.query(`
      SELECT u.user_id, u.email 
      FROM users u 
      LEFT JOIN customers c ON u.user_id = c.customer_id 
      WHERE c.customer_id IS NULL
    `);

    console.log(`Found ${usersWithoutCustomers.rows.length} users without customer records:`);
    usersWithoutCustomers.rows.forEach(user => {
      console.log(`- ${user.email} (${user.user_id})`);
    });

    if (usersWithoutCustomers.rows.length === 0) {
      console.log('✅ All users have corresponding customer records!');
      return;
    }

    // Create customer records for users who don't have them
    for (const user of usersWithoutCustomers.rows) {
      try {
        await db.query(`
          INSERT INTO customers (customer_id, name) 
          VALUES ($1, $2)
        `, [user.user_id, user.email.split('@')[0]]); // Use email prefix as name
        
        console.log(`✅ Created customer record for ${user.email}`);
      } catch (error) {
        console.log(`❌ Failed to create customer record for ${user.email}:`, error.message);
      }
    }

    // Verify the fix
    const remainingUsers = await db.query(`
      SELECT COUNT(*) as count
      FROM users u 
      LEFT JOIN customers c ON u.user_id = c.customer_id 
      WHERE c.customer_id IS NULL
    `);

    if (remainingUsers.rows[0].count === '0') {
      console.log('\n✅ All users now have customer records!');
    } else {
      console.log(`\n❌ ${remainingUsers.rows[0].count} users still missing customer records`);
    }

  } catch (error) {
    console.error('❌ Error fixing customer records:', error.message);
  } finally {
    await db.end();
  }
}

// Run the fix
fixCustomerRecords();
