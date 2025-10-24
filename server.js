// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  noCors: false, // Ensure CORS headers are added
});

const PORT = process.env.PORT || 10000; // fallback for local testing

// Add CORS headers manually (optional but reliable)
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://climate-action-pledge.onrender.com/"); // allow all origins
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(middlewares);
server.use(router);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${PORT}`);
});


