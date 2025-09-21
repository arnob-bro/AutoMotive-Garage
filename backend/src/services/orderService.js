const { v4: uuidv4 } = require("uuid");


class OrderService {
    constructor(db) {
        this.db = db;
    }

    // Generate order code
    generateOrderCode() {
        const random = uuidv4().split("-")[0].toUpperCase();;
        const datePart = new Date().toISOString().split("T")[0].replace(/-/g, "");
        return `ORD-${datePart}-${random}`;
    }

    // Create Order
    async createOrder(orderData) {
        const {
        customer_id,
        delivery_address,
        items,
        total_amount,
        tax,
        net_amount,
        payment_status,
        payment_method,
        status = "processing"
        } = orderData;

        const order_code = this.generateOrderCode();

        try {
        // Insert into orders table
        const result = await this.db.query(
            `INSERT INTO orders 
            (order_code, status, total_amount, tax, net_amount, payment_status, payment_method, delivery_address, customer_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *`,
            [
            order_code,
            status,
            total_amount,
            tax,
            net_amount,
            payment_status,
            payment_method,
            delivery_address,
            customer_id
            ]
        );

        const order = result.rows[0];
        var totalPrice = 0;

        // Insert order items
        for (const item of items) {
            await this.db.query(
            `INSERT INTO order_items (quantity, price_each, order_id, part_id)
            VALUES ($1, $2, $3, $4)`,
            [
                item.quantity,
                item.price_each,
                order.order_id,
                item.part_id || null
            ]
            );

            totalPrice += item.quantity*item.price_each;
        }

        order.totalPrice = totalPrice;
        
        return order;
        } catch (err) {
        console.error("Error in createOrder:", err);
        throw err;
        }
    }


    // Get order by ID
    async getOrders(page = 1, limit = 10, searchTerm = "", status = "") {
        try {
        const offset = (page - 1) * limit;
        let query = `SELECT * FROM orders WHERE 1=1`;
        const params = [];
        let index = 1;
    
        if (searchTerm) {
            query += ` AND (order_code ILIKE $${index} OR delivery_address ILIKE $${index})`;
            params.push(`%${searchTerm}%`);
            index++;
        }
    
        if (status) {
            query += ` AND status = $${index}`;
            params.push(status);
            index++;
        }
    
        // Get total count for pagination
        const countQuery = `SELECT COUNT(*) FROM (${query}) AS total`;
        const countResult = await this.db.query(countQuery, params);
        const totalCount = parseInt(countResult.rows[0].count);
    
        // Add pagination to main query
        query += ` ORDER BY created_at DESC LIMIT $${index} OFFSET $${index + 1}`;
        params.push(limit, offset);
    
        // Fetch paginated orders
        const result = await this.db.query(query, params);
        const orders = result.rows;
    
        // Optionally, fetch order items for all orders in one query
        if (orders.length > 0) {
            const orderIds = orders.map(o => o.order_id);
            const itemsResult = await this.db.query(
            `SELECT oi.order_id, oi.order_items_id, oi.quantity, oi.price_each, p.part_id, p.name
            FROM order_items oi
            JOIN parts p ON oi.part_id = p.part_id
            WHERE oi.order_id = ANY($1)`,
            [orderIds]
            );
    
            const itemsMap = {};
            itemsResult.rows.forEach(item => {
            if (!itemsMap[item.order_id]) itemsMap[item.order_id] = [];
            itemsMap[item.order_id].push(item);
            });
    
            // Attach items to orders
            orders.forEach(order => {
            order.items = itemsMap[order.order_id] || [];
            });
        }
    
        return {
            page,
            limit,
            total: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            data: orders
        };
        } catch (err) {
        console.error("Error in getOrders:", err);
        throw err;
        }
    }
  

    // Update order status
    async updateOrderStatus(order_id, status) {
        try {
        const result = await this.db.query(
            `UPDATE orders 
            SET status=$1, updated_at=CURRENT_TIMESTAMP
            WHERE order_id=$2
            RETURNING *`,
            [status, order_id]
        );

        if(result.rows[0].status === "delivered"){
            this.updatePaymentStatus(order_id,"paid");
        }
        return result.rows[0] || null;
        } catch (err) {
        console.error("Error in updateOrderStatus:", err);
        throw err;
        }
    }

    // Update payment status
    async updatePaymentStatus(order_id, payment_status) {
        try {
        const result = await this.db.query(
            `UPDATE orders 
            SET payment_status=$1, updated_at=CURRENT_TIMESTAMP
            WHERE order_id=$2
            RETURNING *`,
            [payment_status, order_id]
        );
        return result.rows[0] || null;
        } catch (err) {
        console.error("Error in updatePaymentStatus:", err);
        throw err;
        }
    }
}

module.exports = OrderService;
