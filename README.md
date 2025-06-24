# Health Pharmacy Website

A full-stack web application for managing medicine supply in tier-2 cities. Built with Spring Boot and React.

## Features

- User Authentication and Authorization
- Medicine Catalog with Categories
- Search and Filter Functionality
- Shopping Cart and Order Management
- Prescription Management
- Admin Dashboard
- Order Tracking
- Stock Management

## Tech Stack

### Backend
- Java 11
- Spring Boot 2.7.0
- Spring Security
- Spring Data JPA
- MySQL
- JWT Authentication

### Frontend (To be implemented)
- React
- Redux
- Material-UI
- Axios

## Prerequisites

- Java 11 or higher
- Maven
- MySQL
- Node.js and npm (for frontend)

## Setup Instructions

1. Clone the repository
2. Configure MySQL database
   - Create a database named `health_pharmacy`
   - Update database credentials in `application.properties`

3. Build and run the backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

4. Set up and run the frontend (to be implemented)
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/user` - Get current user details

### Medicines
- GET `/api/medicines` - Get all medicines
- GET `/api/medicines/available` - Get available medicines
- GET `/api/medicines/search` - Search medicines
- GET `/api/medicines/category/{category}` - Get medicines by category
- GET `/api/medicines/{id}` - Get medicine by ID
- POST `/api/medicines` - Add new medicine
- PUT `/api/medicines/{id}` - Update medicine
- DELETE `/api/medicines/{id}` - Delete medicine

### Orders
- GET `/api/orders` - Get all orders
- GET `/api/orders/user` - Get user orders
- GET `/api/orders/{id}` - Get order by ID
- POST `/api/orders` - Create new order
- PUT `/api/orders/{id}/status` - Update order status
- POST `/api/orders/{id}/cancel` - Cancel order

## Security

The application uses JWT (JSON Web Tokens) for authentication. All API endpoints except registration and login require a valid JWT token in the Authorization header.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 