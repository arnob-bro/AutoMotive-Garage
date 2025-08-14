<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Roles
        DB::statement("
            CREATE TABLE roles (
                role_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(255) NOT NULL
            )
        ");


        // Permissions
        DB::statement("
            CREATE TABLE permissions (
                permission_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                code VARCHAR(255) UNIQUE NOT NULL,
                description VARCHAR(255) NOT NULL
            )
        ");


         // role_permissions
        DB::statement("
        CREATE TABLE role_permissions (
            role_id BIGINT UNSIGNED NOT NULL,
            permission_id BIGINT UNSIGNED NOT NULL,
            FOREIGN KEY (role_id) REFERENCES roles(role_id),
            FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
            PRIMARY KEY (role_id, permission_id)
        )
        ");


        // Users
        DB::statement("
            CREATE TABLE users (
                user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                role_id BIGINT UNSIGNED,
                FOREIGN KEY (role_id) REFERENCES roles(role_id)
            )
        ");

        // Customers
        DB::statement("
            CREATE TABLE customers (
                customer_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                birthday DATE,
                anniversary DATE,
                address VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        ");

        // Appointments
        DB::statement("
            CREATE TABLE appointments (
                appointment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                appointment_date DATETIME NOT NULL,
                status VARCHAR(50) NOT NULL,
                vehicle_model VARCHAR(255) NOT NULL,
                vehicle_brand VARCHAR(255) NOT NULL,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                customer_id BIGINT UNSIGNED,
                FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
            )
        ");

        // Services
        DB::statement("
            CREATE TABLE services (
                service_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                duration_estimate INT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        ");

        // Appointment_Services
        DB::statement("
            CREATE TABLE appointment_services (
                appointment_services_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                cost DECIMAL(10,2) NOT NULL,
                appointment_id BIGINT UNSIGNED,
                service_id BIGINT UNSIGNED,
                FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
                FOREIGN KEY (service_id) REFERENCES services(service_id)
            )
        ");

        // Parts
        DB::statement("
            CREATE TABLE parts (
                part_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                short_description VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                stock INT NOT NULL,
                image_url VARCHAR(255),
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                long_description TEXT
            )
        ");

        // Orders
        DB::statement("
            CREATE TABLE orders (
                order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                status VARCHAR(50) NOT NULL,
                total_amount DECIMAL(10,2) NOT NULL,
                payment_status VARCHAR(50) NOT NULL,
                payment_method VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                customer_id BIGINT UNSIGNED,
                FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
            )
        ");

        // Order_Items
        DB::statement("
            CREATE TABLE order_items (
                order_items_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                quantity INT NOT NULL,
                price_each DECIMAL(10,2) NOT NULL,
                order_id BIGINT UNSIGNED,
                part_id BIGINT UNSIGNED,
                FOREIGN KEY (order_id) REFERENCES orders(order_id),
                FOREIGN KEY (part_id) REFERENCES parts(part_id)
            )
        ");

        // Payments
        DB::statement("
            CREATE TABLE payments (
                payment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                amount DECIMAL(10,2) NOT NULL,
                method VARCHAR(50) NOT NULL,
                status VARCHAR(50) NOT NULL,
                transaction_id VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                customer_id BIGINT UNSIGNED,
                order_id BIGINT UNSIGNED,
                appointment_id BIGINT UNSIGNED,
                FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
                FOREIGN KEY (order_id) REFERENCES orders(order_id),
                FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
            )
        ");

        // ContactForms
        DB::statement("
            CREATE TABLE contact_forms (
                contactform_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                customer_id BIGINT UNSIGNED,
                FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
            )
        ");

        // Reviews
        DB::statement("
            CREATE TABLE reviews (
                review_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                rating INT NOT NULL,
                comment TEXT NOT NULL,
                review_type VARCHAR(50) NOT NULL,
                reference_id BIGINT UNSIGNED NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                customer_id BIGINT UNSIGNED,
                FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
            )
        ");

        // Categories
        DB::statement("
            CREATE TABLE categories (
                category_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                category_name VARCHAR(255) NOT NULL
            )
        ");

        // Category Assignments
        DB::statement("
            CREATE TABLE category_assignments (
                category_assignment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                part_id BIGINT UNSIGNED,
                category_id BIGINT UNSIGNED,
                FOREIGN KEY (part_id) REFERENCES parts(part_id),
                FOREIGN KEY (category_id) REFERENCES categories(category_id)
            )
        ");

        // Gallery
        DB::statement("
            CREATE TABLE gallery (
                image_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                image_url VARCHAR(255) NOT NULL,
                caption VARCHAR(255),
                uploaded_at TIMESTAMP NULL
            )
        ");

        // FAQs
        DB::statement("
            CREATE TABLE faqs (
                faq_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                is_shown BOOLEAN DEFAULT TRUE
            )
        ");

        // Customer Education
        DB::statement("
            CREATE TABLE customer_education (
                customer_education_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(255) NOT NULL,
                published_at TIMESTAMP NULL
            )
        ");

        // Promotions
        DB::statement("
            CREATE TABLE promotions (
                promotion_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                discount_percentage DECIMAL(5,2) NOT NULL,
                valid_from DATE NOT NULL,
                valid_until DATE NOT NULL,
                is_active BOOLEAN DEFAULT TRUE
            )
        ");
    }

    public function down()
    {
        DB::statement("DROP TABLE IF EXISTS promotions");
        DB::statement("DROP TABLE IF EXISTS customer_education");
        DB::statement("DROP TABLE IF EXISTS faqs");
        DB::statement("DROP TABLE IF EXISTS gallery");
        DB::statement("DROP TABLE IF EXISTS category_assignments");
        DB::statement("DROP TABLE IF EXISTS categories");
        DB::statement("DROP TABLE IF EXISTS reviews");
        DB::statement("DROP TABLE IF EXISTS contact_forms");
        DB::statement("DROP TABLE IF EXISTS payments");
        DB::statement("DROP TABLE IF EXISTS order_items");
        DB::statement("DROP TABLE IF EXISTS orders");
        DB::statement("DROP TABLE IF EXISTS parts");
        DB::statement("DROP TABLE IF EXISTS appointment_services");
        DB::statement("DROP TABLE IF EXISTS services");
        DB::statement("DROP TABLE IF EXISTS appointments");
        DB::statement("DROP TABLE IF EXISTS customers");
        DB::statement("DROP TABLE IF EXISTS users");
        DB::statement("DROP TABLE IF EXISTS role_permissions");
        DB::statement("DROP TABLE IF EXISTS permissions");
        DB::statement("DROP TABLE IF EXISTS roles");
    }
};
