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
    duration_estimate VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(50),
    vehicle_model VARCHAR(100),
    vehicle_brand VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


CREATE TABLE appointment_services (
    appointment_services_id SERIAL PRIMARY KEY,
    cost NUMERIC(10,2),
    appointment_id INT,
    service_id INT,
    CONSTRAINT fk_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services(service_id)
);


CREATE TABLE parts (
    part_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    short_description VARCHAR(255),
    price NUMERIC(10,2),
    stock INT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    long_description TEXT
);



CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL
);



CREATE TABLE category_assignment (
    category_assignment_id SERIAL PRIMARY KEY,
    part_id INT,
    category_id INT,
    CONSTRAINT fk_part FOREIGN KEY (part_id) REFERENCES parts(part_id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    total_amount NUMERIC(10,2),
    payment_status VARCHAR(50),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);



CREATE TABLE order_items (
    order_items_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    price_each NUMERIC(10,2),
    order_id INT,
    part_id INT,
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
    appointment_id INT,
    CONSTRAINT fk_payment_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_payment_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
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
