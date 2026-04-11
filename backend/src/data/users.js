export const users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "Admin@123",
    name: "System Admin",
    role: "admin"
  },
  {
    id: 2,
    email: "manager@example.com",
    password: "Manager@123",
    name: "Operations Manager",
    role: "manager"
  },
  {
    id: 3,
    email: "user@example.com",
    password: "User@123",
    name: "Regular User",
    role: "user"
  }
];

export const roleHierarchy = {
  admin: 3,
  manager: 2,
  user: 1
};
