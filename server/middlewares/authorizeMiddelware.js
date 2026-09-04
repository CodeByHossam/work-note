const authorize = (allowedRoles) => {
  return (req, res, next) => {
   
    if (!req.user) {
      return res.status(401).json({
        isSuccess: false,
        message: "Not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log("User role: ", req.user.role);
      return res.status(403).json({
        isSuccess: false,
        message: "You are not authorized to perform this action",
      });
    }

    next();
  };
};

module.exports = authorize;