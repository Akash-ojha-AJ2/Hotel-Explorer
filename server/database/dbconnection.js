import mongoose from "mongoose";

const Connection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "MERN_AUTHENTICATION",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};

export default Connection;
