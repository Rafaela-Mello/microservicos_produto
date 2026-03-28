Service User

POST /users
http://localhost:3002/users

{
  "name": "Rafa",
  "email": "rafa@gmail.com"
}

------------

GET /users/{id}
http://localhost:3002/users/1

{
  "id": 1,
  "name": "Rafa",
  "email": "rafa@gmail.com",
  "createdAt": "2026-03-28T19:52:57.000Z",
  "updatedAt": "2026-03-28T19:52:57.000Z"
}

==================================================

Service Products

POST /products
http://localhost:3001/products

{
  "name": "Iphone",
  "description": "Iphone 15 Pro",
  "price": 4000.00
}

------------

GET /products
http://localhost:3001/products

[
  {
    "id": 1,
    "name": "Iphone",
    "description": "Iphone 15 Pro",
    "price": 4000.00,
    "createdAt": "2026-03-28T19:56:23.000Z",
    "updatedAt": "2026-03-28T19:56:23.000Z"
  },
  {
    "id": 2,
    "name": "Iphone",
    "description": "Iphone 16 Pro",
    "price": 6000.00,
    "createdAt": "2026-03-28T21:12:49.000Z",
    "updatedAt": "2026-03-28T21:12:49.000Z"
  }
]

------------

GET /products/{id}
http://localhost:3001/products/1

{
  "id": 1,
  "name": "Iphone",
  "description": "Iphone 15 Pro",
  "price": 4000.00,
  "createdAt": "2026-03-28T19:56:23.000Z",
  "updatedAt": "2026-03-28T19:56:23.000Z"
}

==================================================

Service Order

POST /orders
http://localhost:3005/orders

{
  "userId": 1,
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 2, "quantity": 1 }
  ]
}

------------

GET /orders/{id}
http://localhost:3005/orders/1

{
  "id": 11,
  "userId": 1,
  "items": [
    {
      "quantity": 1,
      "productId": 1
    },
    {
      "quantity": 1,
      "productId": 2
    }
  ],
  "status": "PAGO",
  "createdAt": "2026-03-28T21:34:58.000Z",
  "updatedAt": "2026-03-28T21:35:51.000Z"
}

==================================================

Service Inventory

GET /inventory/{productId}
http://localhost:3003/inventory/1

{
  "id": 1,
  "productId": 1,
  "quantity": 1,
  "createdAt": "2026-03-28T19:58:35.000Z",
  "updatedAt": "2026-03-28T20:33:05.000Z"
}

------------

PUT /inventory/{productId}
http://localhost:3003/inventory/1

{
  "quantity": 4
}

==================================================

Service Payment

POST /payments
http://localhost:3004/payments

{
  "orderId": 1,
  "status": "APROVADO"  // ou "RECUSADO"
}