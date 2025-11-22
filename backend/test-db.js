const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ MySQL Connected Successfully!');
    console.log('\n📋 Checking tables...\n');

    // Check if database exists
    const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
    if (databases.length === 0) {
      console.log('❌ Database "foodzy" does not exist!');
      console.log('\nCreating database...');
      await connection.query('CREATE DATABASE IF NOT EXISTS foodzy');
      console.log('✅ Database created!');
    }

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Check tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables in database:');
    if (tables.length === 0) {
      console.log('⚠️  No tables found! Creating required tables...\n');
      
      // Create users table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Created users table');

      // Create otps table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS otps (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          code VARCHAR(6) NOT NULL,
          expires_at DATETIME NOT NULL,
          used TINYINT(1) DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Created otps table');

      // Create products table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          old_price DECIMAL(10, 2),
          image_url TEXT,
          category VARCHAR(100),
          is_popular TINYINT(1) DEFAULT 0,
          is_deal_of_day TINYINT(1) DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Created products table');

      // Create orders table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          total DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
      console.log('✅ Created orders table');

      // Create order_items table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INT AUTO_INCREMENT PRIMARY KEY,
          order_id INT NOT NULL,
          product_id INT NOT NULL,
          quantity INT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
        )
      `);
      console.log('✅ Created order_items table');

      // Insert sample products
      console.log('\n📦 Inserting sample products...');
      await connection.query(`
        INSERT INTO products (name, price, old_price, image_url, category, is_popular) VALUES
        ('Seeds Of Change Organic Quinoa', 32.85, 39.00, 'https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=600&q=80', 'Snacks', 1),
        ('Blue Diamond Almonds Lightly Salted', 23.85, 28.00, 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80', 'Snacks', 1),
        ('Encore Seafoods Stuffed Salmon', 35.85, 42.00, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', 'Meats', 1),
        ('Organic Vanilla Farm Watermelon', 48.85, 52.00, 'https://images.unsplash.com/photo-1439127989242-c3749a012eac?auto=format&fit=crop&w=600&q=80', 'Fruits', 1),
        ('Simply Lemonade with Raspberry', 15.95, 19.00, 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=600&q=80', 'Drinks', 1),
        ('Fresh Organic Apple Bag', 17.85, 21.00, 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=600&q=80', 'Fruits', 1),
        ('Honey Greek Yogurt', 12.99, 15.50, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', 'Dairy', 1),
        ('Organic Coffee Beans', 24.99, 29.99, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80', 'Beverages', 1)
      `);
      console.log('✅ Sample products inserted!');

      console.log('\n✅ All tables created successfully!');
    } else {
      tables.forEach((table) => {
        console.log(`  ✅ ${Object.values(table)[0]}`);
      });
    }

    // Test query
    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    console.log(`\n📊 Total products in database: ${products[0].count}`);

    await connection.end();
    console.log('\n✅ Database connection test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
