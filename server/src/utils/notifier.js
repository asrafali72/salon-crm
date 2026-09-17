const notificationQueue = require("../queues/notification.queue");
const reminderQueue = require("../queues/reminder.queue");

const bookingConfirmation = async (
  appointment
) => {
  await notificationQueue.add("booking", {
    customer: appointment.customer.name,
    phone: appointment.customer.phone,
    type: "BOOKING_CONFIRMATION",
    message: `Your appointment is booked on ${appointment.startTime}`,
  });
};

const scheduleReminder = async (
  appointment
) => {
  const appointmentTime = new Date(
    appointment.appointmentDate
  );

  const reminder24 = new Date(appointmentTime);
  reminder24.setHours(
    reminder24.getHours() - 24
  );

  const reminder2 = new Date(appointmentTime);
  reminder2.setHours(
    reminder2.getHours() - 2
  );

  await reminderQueue.add(
    "24hour",
    {
      customer: appointment.customer.name,
      phone: appointment.customer.phone,
      appointmentDate:
        appointment.appointmentDate,
      time: appointment.startTime,
    },
    {
      delay:
        reminder24.getTime() - Date.now(),
    }
  );

  await reminderQueue.add(
    "2hour",
    {
      customer: appointment.customer.name,
      phone: appointment.customer.phone,
      appointmentDate:
        appointment.appointmentDate,
      time: appointment.startTime,
    },
    {
      delay:
        reminder2.getTime() - Date.now(),
    }
  );
};

module.exports = {
  bookingConfirmation,
  scheduleReminder,
};