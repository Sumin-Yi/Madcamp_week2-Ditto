const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        id: String,
        password: String
    },
    {
        collection: "UserInfo",
    }
)

mongoose.model("UserInfo", UserDetailsSchema)