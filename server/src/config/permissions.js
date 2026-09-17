const permissions = {
  OWNER: ["*"],

  ADMIN: [
    "branches.read",
    "branches.write",

    "staff.read",
    "staff.write",

    "customers.read",
    "customers.write",

    "services.read",
    "services.write",

    "appointments.read",
    "appointments.write",

    "billing.read",
    "billing.write",

    "inventory.read",
    "inventory.write",

    "loyalty.read",
    "loyalty.write",

    "reports.read",

    "settings.write",
    "users.write",
  ],

  RECEPTIONIST: [
    "customers.read",
    "customers.write",

    "appointments.read",
    "appointments.write",
    "appointments.checkin",

    "billing.read",
    "billing.write",
  ],

  // STYLIST: [
  //   "appointments.read.own",
  //   "appointments.start",
  //   "appointments.complete",
  //   "appointments.notes",
  // ],

  STYLIST: [
  "appointments.read",
  "appointments.write",
  "appointments.read.own",
  "appointments.start",
  "appointments.complete",
  "appointments.notes",
  ],

  ASSISTANT: [
    "tasks.read.own",
    "tasks.update.own",
    "appointments.read.limited",
  ],

  CUSTOMER: [
    "profile.read.own",
    "profile.write.own",

    "appointments.read.own",
    "appointments.create.own",
    "appointments.cancel.own",

    "invoices.read.own",

    "loyalty.read.own",
  ],
};

module.exports = permissions;