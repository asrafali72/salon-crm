const permissions = require("../config/permissions");

const authorize = (permission) => {
  return (req, res, next) => {
    const rolePermissions = permissions[req.user.role] || [];

    const hasPermission =
      rolePermissions.includes("*") ||
      rolePermissions.includes(permission);

    if (!hasPermission) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};

module.exports = authorize;