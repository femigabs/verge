const express = require("express");
const bodyParser = require("body-parser")
const db = require("./database");
const user = require("./Routes/userRoute"); 
const admin = require("./Routes/adminRoute");
const parcel = require("./Routes/parcelRoute");

let app = express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
console.log("Application Listening on Port 4000")
});

app.get('/', (req, res) => {
return res.status(200).json({
message: "welcome to my Parcel Delivery Service"
});
});
app.use("/api/v1", user);
app.use("/api/v1", admin);
app.use("/api/v1", parcel);

module.exports = app;