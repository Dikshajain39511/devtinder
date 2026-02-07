const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://diksha1998:ZdW1Ry7jYKnRcXkS@dikshacluster.gc7rnpv.mongodb.net/devTinder",
  );
};

module.exports=connectDB;

