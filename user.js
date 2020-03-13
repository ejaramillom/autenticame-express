const mongoose = require("mongoose");
const UserSchema = require("./userSchema");

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/datathree", { autoIndex: false, useNewUrlParser: true });
const db = mongoose.connection;

module.exports = mongoose.model("User", UserSchema);
