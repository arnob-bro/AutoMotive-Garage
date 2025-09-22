-- Insert demo bookings
INSERT INTO bookings 
(booking_code, booking_date, booking_time, status, paymentStatus, vehicle, duration, total, customer_id) 
VALUES
('BK-2023-001', '2023-09-01', '09:00:00', 'pending', 'pending', 'Toyota Corolla', '1 hour', 2500.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-002', '2023-09-02', '10:30:00', 'confirmed', 'paid', 'Honda Civic', '2 hours', 4500.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-003', '2023-09-03', '11:00:00', 'completed', 'paid', 'Yamaha R15', '1 hour', 1500.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-004', '2023-09-04', '12:15:00', 'cancelled', 'refunded', 'Suzuki Gixxer', '30 mins', 800.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-005', '2023-09-05', '14:00:00', 'pending', 'pending', 'Nissan Sunny', '1 hour', 2200.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-006', '2023-09-06', '15:30:00', 'confirmed', 'paid', 'Hyundai Sonata', '2 hours', 5000.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-007', '2023-09-07', '16:00:00', 'pending', 'pending', 'KTM Duke 390', '1 hour', 1800.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-008', '2023-09-08', '17:45:00', 'completed', 'paid', 'Ford Mustang', '3 hours', 12000.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-009', '2023-09-09', '09:30:00', 'confirmed', 'paid', 'Tesla Model 3', '1 hour', 6000.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-010', '2023-09-10', '11:30:00', 'cancelled', 'refunded', 'Bajaj Pulsar 150', '45 mins', 900.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-011', '2023-09-11', '13:15:00', 'completed', 'paid', 'BMW X5', '2 hours', 10000.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec'),
('BK-2023-012', '2023-09-12', '15:45:00', 'pending', 'pending', 'Toyota Prius', '1 hour', 3000.00, 'f778a3f7-16c3-4725-a45d-1c9587fddfec');


-- Insert demo booking_services (assume service_id exists in services table)
INSERT INTO booking_services (booking_id, service_id) VALUES
(1, 1), (1, 2),
(2, 3), (2, 4),
(3, 1), (3, 5),
(4, 2),
(5, 3), (5, 6),
(6, 4), (6, 5),
(7, 1),
(8, 7), (8, 2),
(9, 6), (9, 5),
(10, 3),
(11, 8), (11, 1),
(12, 2), (12, 6);
