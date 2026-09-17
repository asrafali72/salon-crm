# 💇 Salon CRM (Enterprise Full Stack)

A production-ready multi-branch Salon CRM built with the MERN ecosystem + PostgreSQL.

## 🚀 Features

- Multi-branch salon management
- JWT Authentication
- Role Based Access Control (RBAC)
- Customer Portal
- Receptionist Panel
- Stylist Panel
- Admin Dashboard
- Appointment Booking
- Billing & Payments
- Loyalty System
- Inventory Management
- Reports & Analytics
- Socket.io Real-time Updates
- Redis Caching
- BullMQ Background Jobs
- PostgreSQL + Prisma ORM

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router
- Axios
- Context API
- React Hook Form
- Zod
- Recharts

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Redis
- BullMQ
- Socket.io
- JWT
- bcrypt

---

# 👥 User Roles

| Role | Description |
|------|-------------|
| OWNER | Full system access |
| ADMIN | Manage salon operations |
| RECEPTIONIST | Booking, customers, billing |
| STYLIST | Schedule & service management |
| ASSISTANT | Task management |
| CUSTOMER | Online booking portal |

---

# 📁 Project Structure

```text
salon-crm/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── context/
│   │   └── hooks/
│
├── server/
│   ├── prisma/
│   ├──src/
│   │   ├── modules/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── sockets/
│   │   ├── queues/
│   │   ├── utils/
│
├── README.md
└── package.json
```

---

# 🗄 Database Modules

- User
- Role
- Branch
- Staff
- Customer
- Service
- Appointment
- Invoice
- Payment
- Loyalty
- Inventory
- Review
- Task
- Notification
- Audit Log

---

# 🔐 Authentication

Implemented using:

- JWT Access Token
- Refresh Token
- Password Hashing (bcrypt)
- Protected Routes
- RBAC Middleware

---

# 📅 Appointment Workflow

Customer → Reception → Stylist → Billing

Status Flow

Pending → Confirmed → Checked In → In Service → Completed

OR

Pending → Cancelled

Business Rules

- No double booking
- Stylist availability validation
- Branch validation
- ACID database transaction

---

# 💳 Billing

Supported Payment Methods

- Cash
- Card
- UPI
- Wallet

Features

- Immutable invoices
- Refund ledger
- Payment history
- Receipt generation

---

# 🎁 Loyalty

- Bronze
- Silver
- Gold
- Platinum

Customers earn points after successful payment.

---

# 📦 Inventory

- Product management
- Stock ledger
- Purchase entries
- Usage tracking
- Low stock alerts

---

# 📊 Dashboards

## Admin

- Revenue
- Branch comparison
- Utilization
- Inventory
- Repeat customers

## Reception

- Today's bookings
- Waiting customers
- Check-ins
- Revenue today

## Stylist

- My schedule
- Current service
- History

## Customer

- Book appointment
- Loyalty
- Invoice history

---

# 🔔 Background Jobs

BullMQ Queues

- notificationQueue
- reminderQueue
- analyticsQueue
- campaignQueue

Retry Strategy

- Exponential Backoff
- Dead Letter Queue

---

# ⚡ Redis Usage

- JWT Blacklist
- Rate Limiting
- Availability Cache
- Dashboard Cache
- BullMQ Backend

---

# 🌐 REST APIs

## Auth

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

## Customers

GET /customers

POST /customers

PATCH /customers/:id

DELETE /customers/:id

## Appointments

GET /appointments

POST /appointments

PATCH /appointments/:id

## Billing

POST /invoices

POST /payments

## Loyalty

GET /loyalty

POST /loyalty/redeem

---

# 🔄 Real-time Events

Socket.io Events

- appointmentCreated
- appointmentUpdated
- customerCheckedIn
- paymentCompleted
- lowStockAlert

---

# 🛡 Security

- Helmet
- CORS
- JWT
- RBAC
- Zod Validation
- Prisma SQL Injection Protection
- Rate Limiter
- Audit Logs

---

# ⚙ Environment Variables

## Server (.env)

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/saloncrm"

JWT_ACCESS_SECRET=your_secret

JWT_REFRESH_SECRET=refresh_secret

REDIS_URL=redis://localhost:6379

REDIS_HOST = xxxx

REDIS_PORT = xxxx

REDIS_PASS = xxxx

FRONTEND_URL="http://localhost:5173"
```

## Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# ▶ Installation

## 1. Clone

```bash
git clone https://github.com/yourusername/salon-crm.git

cd salon-crm
```

## 2. Install Frontend

```bash
cd client

npm install
```

## 3. Install Backend

```bash
cd ../server

npm install
```

## 4. Database

```bash
npx prisma migrate dev

npx prisma generate

npm run seed
```

## 5. Start Redis

```bash
redis-server
```

## 6. Run Backend

```bash
npm run dev
```

## 7. Run Frontend

```bash
cd ../client

npm run dev
```

Application URLs

Frontend

<http://localhost:5173>

Backend

<http://localhost:5000>

---

# 👨‍💻 Author

**Asraf Ali**

Full Stack Developer

Built as an enterprise multi-branch Salon CRM using React, Node.js, PostgreSQL, Prisma, Redis, BullMQ and Socket.io.
