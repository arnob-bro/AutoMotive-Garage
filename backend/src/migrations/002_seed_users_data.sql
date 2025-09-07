-- Insert 20 seed users with bcrypt-hashed password "123456"
INSERT INTO users (user_id, email, password_hash) VALUES
('11111111-1111-1111-1111-111111111111', 'alice@example.com', crypt('123456', gen_salt('bf'))),
('22222222-2222-2222-2222-222222222222', 'bob@example.com', crypt('123456', gen_salt('bf'))),
('33333333-3333-3333-3333-333333333333', 'charlie@example.com', crypt('123456', gen_salt('bf'))),
('44444444-4444-4444-4444-444444444444', 'david@example.com', crypt('123456', gen_salt('bf'))),
('55555555-5555-5555-5555-555555555555', 'eva@example.com', crypt('123456', gen_salt('bf'))),
('66666666-6666-6666-6666-666666666666', 'frank@example.com', crypt('123456', gen_salt('bf'))),
('77777777-7777-7777-7777-777777777777', 'grace@example.com', crypt('123456', gen_salt('bf'))),
('88888888-8888-8888-8888-888888888888', 'henry@example.com', crypt('123456', gen_salt('bf'))),
('99999999-9999-9999-9999-999999999999', 'ivy@example.com', crypt('123456', gen_salt('bf'))),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'jack@example.com', crypt('123456', gen_salt('bf'))),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'karen@example.com', crypt('123456', gen_salt('bf'))),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'leo@example.com', crypt('123456', gen_salt('bf'))),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'mia@example.com', crypt('123456', gen_salt('bf'))),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'noah@example.com', crypt('123456', gen_salt('bf'))),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'olivia@example.com', crypt('123456', gen_salt('bf'))),
('12121212-1212-1212-1212-121212121212', 'paul@example.com', crypt('123456', gen_salt('bf'))),
('13131313-1313-1313-1313-131313131313', 'quinn@example.com', crypt('123456', gen_salt('bf'))),
('14141414-1414-1414-1414-141414141414', 'ruby@example.com', crypt('123456', gen_salt('bf'))),
('15151515-1515-1515-1515-151515151515', 'sam@example.com', crypt('123456', gen_salt('bf'))),
('16161616-1616-1616-1616-161616161616', 'tina@example.com', crypt('123456', gen_salt('bf')));

INSERT INTO users (user_id, email, password_hash,role) VALUES
('17161616-1616-1616-1616-161616161616', 'arnob@m3techops.com', crypt('123456', gen_salt('bf')), 'admin');


-- Insert into customers (matching user_id)
INSERT INTO customers (customer_id, name) VALUES
('11111111-1111-1111-1111-111111111111', 'Alice Johnson'),
('22222222-2222-2222-2222-222222222222', 'Bob Smith'),
('33333333-3333-3333-3333-333333333333', 'Charlie Brown'),
('44444444-4444-4444-4444-444444444444', 'David Miller'),
('55555555-5555-5555-5555-555555555555', 'Eva Williams'),
('66666666-6666-6666-6666-666666666666', 'Frank Harris'),
('77777777-7777-7777-7777-777777777777', 'Grace Lee'),
('88888888-8888-8888-8888-888888888888', 'Henry Wilson'),
('99999999-9999-9999-9999-999999999999', 'Ivy Davis'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jack Martinez'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Karen Taylor'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Leo Anderson'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Mia Thomas'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Noah White'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Olivia Hall'),
('12121212-1212-1212-1212-121212121212', 'Paul Young'),
('13131313-1313-1313-1313-131313131313', 'Quinn Allen'),
('14141414-1414-1414-1414-141414141414', 'Ruby King'),
('15151515-1515-1515-1515-151515151515', 'Sam Scott'),
('16161616-1616-1616-1616-161616161616', 'Tina Green'),
('17161616-1616-1616-1616-161616161616', 'Arnob');
