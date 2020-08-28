const express = require("express");
const app = express();
const db = require("./models");
const cors = require('cors');
//allowing cross origin
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//api calls
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);
//server run
db.sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log("server is working in port 4000");
    });
});