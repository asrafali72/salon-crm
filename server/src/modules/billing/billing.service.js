const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createInvoice = async ({
  appointmentId,
  discount,
}) => {
  return prisma.$transaction(async (tx) => {
    const appointment =
      await tx.appointment.findUnique({
        where: { id: appointmentId },
        include: {
          service: true,
        },
      });

    if (!appointment)
      throw new Error("Appointment not found");

    if (appointment.status !== "COMPLETED")
      throw new Error(
        "Appointment must be completed"
      );

    const exists = await tx.invoice.findUnique({
      where: { appointmentId },
    });

    if (exists)
      throw new Error("Invoice already exists");

    const subtotal = Number(
      appointment.service.price
    );

    const taxAmount =
      (subtotal * Number(appointment.service.tax)) /
      100;

    const total =
      subtotal + taxAmount - discount;

    return tx.invoice.create({
      data: {
        appointmentId,

        subtotal,

        taxAmount,

        discount,

        total,

        items: {
          create: {
            serviceName: appointment.service.name,
            quantity: 1,
            price: subtotal,
            tax: appointment.service.tax,
          },
        },
      },
      include: {
        items: true,
        appointment: {
          include: {
            customer: true,
          },
        },
      },
    });
  });
};

const addPayment = async (data) => {
  return prisma.$transaction(async (tx) => {
    // 1. Create payment
    const payment = await tx.payment.create({
      data,
    });

    // 2. Update invoice paid amount
    await tx.invoice.update({
      where: {
        id: data.invoiceId,
      },
      data: {
        paidAmount: {
          increment: data.amount,
        },
      },
    });

    // 3. Get customer from invoice
    const invoice = await tx.invoice.findUnique({
      where: { id: data.invoiceId },
      include: {
        appointment: true,
      },
    });

    const customerId = invoice.appointment.customerId;

    // 4. Find or create loyalty account
    let account = await tx.loyaltyAccount.findUnique({
      where: { customerId },
    });

    if (!account) {
      account = await tx.loyaltyAccount.create({
        data: {
          customerId,
        },
      });
    }

    // 5. Earn points (1 point per ₹10)
    const earned = Math.floor(Number(data.amount) / 10);

    await tx.loyaltyAccount.update({
      where: {
        id: account.id,
      },
      data: {
        points: {
          increment: earned,
        },
      },
    });

    // 6. Save loyalty transaction
    await tx.loyaltyTransaction.create({
      data: {
        accountId: account.id,
        type: "EARN",
        points: earned,
        note: "Payment reward",
      },
    });

    return payment;
  });
};

const getInvoices = () => {
  return prisma.invoice.findMany({
    include: {
      appointment: {
        include: {
          customer: true,
        },
      },
      payments: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  createInvoice,
  addPayment,
  getInvoices,
};