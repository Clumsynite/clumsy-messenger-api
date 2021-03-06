const mongoose = require("mongoose");

// Local DB config
const config = {
  db: {
    url: "localhost:27017",
    name: "chatdb",
  },
};
// Dev Connection
// const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;
// Deployed Connection
const CONNECTION_URL = process.env.DB_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("Mongo has connected succesfully");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});
