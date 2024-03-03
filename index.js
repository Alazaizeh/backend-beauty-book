import server from "./src/config/express.js";
//importing routes
import actions from "./src/routes/Action/index.js";
import pages from "./src/routes/Page/index.js";
import roles from "./src/routes/Role/index.js";
import services from "./src/routes/Service/index.js";
import users from "./src/routes/User/index.js";
import auth from "./src/routes/Auth/index.js";
import appointments from "./src/routes/Appointment/index.js";
import permissions from "./src/routes/Permission/index.js";
import salons from "./src/routes/Salon/index.js";
import staffs from "./src/routes/Staff/index.js";
//importing middlewares
import isAuthenticated from "./src/middleware/isAuthenticated.js";

const port = 3002;

// Routes
// server.use(isAuthenticated).use("/actions", actions)
server.use("/actions",isAuthenticated, actions);
server.use("/pages",isAuthenticated, pages);
server.use("/roles", isAuthenticated,roles);
server.use("/services",isAuthenticated, services);
server.use("/users",isAuthenticated, users);
server.use("/appointments", appointments);
server.use("/permissions",isAuthenticated, permissions);
server.use("/salons", salons);
server.use("/staff",isAuthenticated, staffs);
server.use("/auth", auth);

server.get("/", (req, res) => {
  res.send("<h1>Working Fine :)</h1>");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
