const allowedRoles = {
  admin: ["admin", "user"],
  user: ["user"],
};
 
module.exports = allowedRoles;
// this is a middleware to check if the user has the right role to access a certain route