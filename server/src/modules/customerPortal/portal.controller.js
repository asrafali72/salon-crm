const service = require("./portal.service");
const { bookingSchema } = require("./portal.validation");
const customerService = require("../customer/customer.service");

const services = async (req, res) => {
  try {
    const data = await service.getServices();
    res.json(data);
  } catch (err) {
    console.error("Services Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const stylists = async (req, res) => {
  try {
    const data = await service.getStylists();
    res.json(data);
  } catch (err) {
    console.error("Stylists Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const book = async (req, res) => {
  try {
    const data = bookingSchema.parse(req.body);
    const booking = await service.createBooking(data);
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(400).json({ message: err.message });
  }
};

const bookings = async (req, res) => {
  const customer = await customerService.getCustomerByUserId(req.user.sub);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  const data = await service.getCustomerBookings(customer.id);
  res.json(data);
};

const cancel = async (req, res) => {
  try {
    const data = await service.cancelBooking(
      req.params.id,
      req.user.customerId
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const loyalty = async (req, res) => {
  const data = await service.getLoyalty(req.user.customerId);
  res.json(data);
};

const invoices = async (req, res) => {
  const data = await service.getInvoices(req.user.customerId);
  res.json(data);
};

const history = async (req, res) => {
  const data = await service.getServiceHistory(req.user.customerId);
  res.json(data);
};


module.exports = {
  services,
  stylists,
  book,
  bookings,
  cancel,
  loyalty,
  invoices,
  history,
};