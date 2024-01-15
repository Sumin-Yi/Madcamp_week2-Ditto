const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        id: String,
        password: String,
        myList: {type: Map, of: Object,}
    },
    {
        collection: "UserInfo",
    }
)

mongoose.model("UserInfo", UserDetailsSchema)