const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const adminUserRoute = require("./routes/admin/user");
const adminClientRoute = require("./routes/admin/client");
const publicGuardRoute = require("./routes/public/guard");
const adminGuardRoute = require("./routes/admin/guard");
const authRoute = require("./routes/auth");
const PORT = 80 || process.env.PORT;
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/admin/user", adminUserRoute);
app.use("/auth", authRoute);
app.use("/admin/client", adminClientRoute);
app.use("/admin/guard", adminGuardRoute);
app.use("/public", publicGuardRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
