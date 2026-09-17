const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const http = require("http");
const { initSocket } = require("./sockets/socket");

const authRoutes = require("./routes/auth.routes");
const branchRoutes = require("./modules/branch/branch.routes");
const staffRoutes = require("./modules/staff/staff.routes");
const serviceRoutes = require("./modules/service/service.routes");
const appointmentRoutes = require("./modules/appointment/appointment.routes");
const customerRoutes = require("./modules/customer/customer.routes");
const billingRoutes = require("./modules/billing/billing.routes");
const inventoryRoutes = require("./modules/inventory/inventory.routes");
const loyaltyRoutes = require("./modules/loyalty/loyalty.routes");
const reportRoutes = require("./modules/report/report.routes");
const portalRoutes = require("./modules/customerPortal/portal.routes");
const reviewRoutes = require("./modules/review/review.routes");
const receptionRoutes = require("./modules/reception/reception.routes");
const stylistRoutes= require("./modules/stylist/stylist.routes");
const assistantRoutes = require("./modules/assistant/assistant.routes");


const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Salon CRM API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/portal", portalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/reception", receptionRoutes);
app.use("/api/stylist", stylistRoutes);
app.use("/api/assistant", assistantRoutes);


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// }); change to socket

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});