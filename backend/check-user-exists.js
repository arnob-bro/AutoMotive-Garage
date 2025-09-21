// Script to check if a specific user exists and create customer record if needed
// Run with: node check-user-exists.js <user-id>

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

async function checkAndCreateUser(userId) {
  console.log(`🔍 Checking user: ${userId}\n`);

  try {
    // Check if user exists in users table
    const userCheck = await db.query(
      "SELECT user_id, email FROM users WHERE user_id = $1",
      [userId]
    );

    if (userCheck.rows.length === 0) {
      console.log(`❌ User ${userId} not found in users table`);
      console.log('💡 Solution: Please logout and login again to get a valid user ID');
      return false;
    }

    const user = userCheck.rows[0];
    console.log(`✅ User found: ${user.email} (${user.user_id})`);

    // Check if customer record exists
    const customerCheck = await db.query(
      "SELECT customer_id FROM customers WHERE customer_id = $1",
      [userId]
    );

    if (customerCheck.rows.length === 0) {
      console.log(`❌ Customer record missing for user ${userId}`);
      
      // Create customer record
      try {
        await db.query(
          `INSERT INTO customers (customer_id, name) 
           VALUES ($1, $2)`,
          [userId, user.email.split('@')[0]]
        );
        console.log(`✅ Created customer record for ${user.email}`);
      } catch (error) {
        console.log(`❌ Failed to create customer record: ${error.message}`);
        return false;
      }
    } else {
      console.log(`✅ Customer record exists for ${user.email}`);
    }

    return true;

  } catch (error) {
    console.error('❌ Error checking user:', error.message);
    return false;
  } finally {
    await db.end();
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];

if (!userId) {
  console.log('Usage: node check-user-exists.js <user-id>');
  console.log('Example: node check-user-exists.js db7bc4f8-f84d-48ac-ab5d-f55072d1cad8');
  process.exit(1);
}

checkAndCreateUser(userId);
