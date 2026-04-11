import { roleHierarchy } from "../data/users.js";

export function requireRole(minimumRole) {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || roleHierarchy[userRole] === undefined) {
      return res.status(403).json({ message: "Role is not recognized" });
    }

    if (roleHierarchy[userRole] < roleHierarchy[minimumRole]) {
      return res.status(403).json({
        message: `Access denied: ${minimumRole} role or higher required`
      });
    }

    return next();
  };
}
