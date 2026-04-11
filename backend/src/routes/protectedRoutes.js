import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";

const router = express.Router();

router.get("/me", authenticateToken, (req, res) => {
  return res.json({
    message: "Token is valid",
    user: req.user
  });
});

router.get("/user-area", authenticateToken, requireRole("user"), (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name}, this is user content`,
    requiredRole: "user"
  });
});

router.get("/manager-area", authenticateToken, requireRole("manager"), (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name}, this is manager content`,
    requiredRole: "manager"
  });
});

router.get("/admin-area", authenticateToken, requireRole("admin"), (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name}, this is admin content`,
    requiredRole: "admin"
  });
});

export default router;
