CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'customer'
);


CREATE TABLE customers (
    customer_id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    birthday DATE,
    anniversary DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    brand VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    year VARCHAR(4) NOT NULL,
    customer_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehicle FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);



CREATE TABLE admins (
    admin_id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    duration VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active', --e.g. Active, Inactive, Deleted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    booking_code VARCHAR(50) UNIQUE NOT NULL,         -- e.g., BK-2023-001
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL,                      -- pending, confirmed, etc.
    paymentStatus VARCHAR(50) NOT NULL,                     -- pendng, paid,refunded
    vehicle VARCHAR(100) NOT NULL,
    duration VARCHAR(50) DEFAULT '1 hour',
    total NUMERIC(10,2) NOT NULL,
    customer_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


CREATE TABLE booking_services (
    booking_services_id SERIAL PRIMARY KEY,
    booking_id INT,
    service_id INT,
    CONSTRAINT fk_booking FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services(service_id)
);


CREATE TABLE parts (
    part_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    short_description VARCHAR(255),
    long_description TEXT,
    price NUMERIC(10,2),
    stock INT,
    category VARCHAR(100), -- added category
    image VARCHAR(255),    -- renamed from image_url to image
    status VARCHAR(20) DEFAULT 'Active', -- Active, Inactive, Deleted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,         -- e.g., ORD-1003
    status VARCHAR(50) NOT NULL,                    -- e.g., processing, shipped, delivered, cancelled
    total_amount NUMERIC(10,2) NOT NULL,           -- total before tax
    tax NUMERIC(10,2) DEFAULT 0,                   -- tax amount
    net_amount NUMERIC(10,2) NOT NULL,            -- total + tax
    payment_status VARCHAR(50) NOT NULL,           -- e.g., pending, paid, refunded
    payment_method VARCHAR(50) NOT NULL,           -- e.g., cod, ssl
    delivery_address TEXT NOT NULL,                -- full customer address
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID NOT NULL,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_items_id SERIAL PRIMARY KEY,           -- item name
    quantity INT NOT NULL,
    price_each NUMERIC(10,2) NOT NULL,            -- price per unit
    order_id INT NOT NULL,
    part_id INT,                                   -- nullable if item not in parts table
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_order_part FOREIGN KEY (part_id) REFERENCES parts(part_id)
);



CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    amount NUMERIC(10,2),
    method VARCHAR(50),
    status VARCHAR(50),
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID,
    order_id INT,
    booking_id INT,
    CONSTRAINT fk_payment_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_payment_booking FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);



CREATE TABLE contact_forms (
    contactform_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    subject VARCHAR(250) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_replies (
    reply_id SERIAL PRIMARY KEY,
    contactform_id INT REFERENCES contact_forms(contactform_id) ON DELETE CASCADE,
    admin VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    rating INT,
    comment TEXT,
    review_type VARCHAR(50),
    reference_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID,
    CONSTRAINT fk_review_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);



CREATE TABLE gallery (
    image_id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    caption TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE faqs (
    faq_id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_shown BOOLEAN DEFAULT TRUE
);



CREATE TABLE customer_education (
    customer_education_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(100),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE promotions (
    promotion_id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    description TEXT,
    discount_percentage NUMERIC(5,2),
    valid_from DATE,
    valid_until DATE,
    is_active BOOLEAN DEFAULT TRUE
);
