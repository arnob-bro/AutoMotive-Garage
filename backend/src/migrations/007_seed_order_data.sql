-- Insert demo orders
INSERT INTO orders 
(order_code, status, total_amount, tax, net_amount, payment_status, payment_method, delivery_address, customer_id)
VALUES
('ORD-1001', 'Processing', 2800.00, 140.00, 2940.00, 'Paid', 'SSL', '123 Gulshan Ave, Dhaka, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1002', 'Shipped', 4500.00, 225.00, 4725.00, 'Paid', 'COD', '456 Banani Rd, Dhaka, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1003', 'Delivered', 1200.00, 60.00, 1260.00, 'Paid', 'SSL', '789 Dhanmondi, Dhaka, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1004', 'Cancelled', 1600.00, 80.00, 1680.00, 'Refunded', 'SSL', 'House 12, Uttara, Dhaka, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1005', 'Processing', 9500.00, 475.00, 9975.00, 'Pending', 'COD', 'Sector 4, Mirpur, Dhaka, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1006', 'Shipped', 1700.00, 85.00, 1785.00, 'Paid', 'SSL', 'Motijheel, Dhaka, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1007', 'Delivered', 6200.00, 310.00, 6510.00, 'Paid', 'SSL', 'Chittagong Road, Narayanganj, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1008', 'Processing', 400.00, 20.00, 420.00, 'Pending', 'COD', 'Rajshahi City, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1009', 'Shipped', 10400.00, 520.00, 10920.00, 'Paid', 'SSL', 'Khulna Sadar, Khulna, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1010', 'Delivered', 700.00, 35.00, 735.00, 'Paid', 'COD', 'Sylhet City, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1011', 'Processing', 5200.00, 260.00, 5460.00, 'Pending', 'SSL', 'Barisal Town, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('ORD-1012', 'Cancelled', 3800.00, 190.00, 3990.00, 'Refunded', 'SSL', 'Rangpur City, Bangladesh', 'f778a3f7-16c3-4725-a45d-1c9587fddfec');


-- Insert demo order_items
INSERT INTO order_items (quantity, price_each, order_id, part_id) VALUES
-- Order 1: Engine Oil
(1, 2800.00, 1, 1),

-- Order 2: Brake Pads
(1, 4500.00, 2, 2),

-- Order 3: Air Filter
(1, 1200.00, 3, 3),

-- Order 4: Spark Plug Set
(1, 1600.00, 4, 4),

-- Order 5: Car Battery
(1, 9500.00, 5, 5),

-- Order 6: Radiator Coolant + Wiper Blades
(1, 850.00, 6, 6),
(1, 850.00, 6, 7),

-- Order 7: Clutch Plate
(1, 6200.00, 7, 9),

-- Order 8: Headlight Bulb
(1, 400.00, 8, 10),

-- Order 9: Car Battery + Shock Absorber
(1, 9500.00, 9, 5),
(1, 900.00, 9, 11),

-- Order 10: Wiper Blades
(1, 700.00, 10, 7),

-- Order 11: Shock Absorber
(1, 5200.00, 11, 11),

-- Order 12: Timing Belt
(1, 3800.00, 12, 12);
