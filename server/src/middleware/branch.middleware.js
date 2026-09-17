const requireBranchAccess = (req, res, next) => {
  const branchId =
    req.params.branchId ||
    req.body.branchId ||
    req.query.branchId;

  if (!branchId) {
    return res.status(400).json({
      message: "Branch ID is required",
    });
  }

  // OWNER has access to every branch
  if (req.user.role === "OWNER") {
    return next();
  }

  const hasAccess = req.user.branchIds?.includes(branchId);

  if (!hasAccess) {
    return res.status(403).json({
      message: "You do not have access to this branch",
    });
  }

  next();
};

module.exports = requireBranchAccess;