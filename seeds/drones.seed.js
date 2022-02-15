// Iteration #1

const mongoose = require("mongoose");
const Drone = require ('../models/Drone.model')



const drones = [
    {
      name: "WindCuter 69",
      propellers: 4,
      maxSpeed: 15,
    },
    {
      name: "C3pO",
      propellers: 4,
      maxSpeed: 12
    },
    {
        name: "Supa Hot fire 123",
        propellers: 4,
        maxSpeed: 18,
    }
];




// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


  Drone.create(drones)
  .then((dronesFromDb) => {
      console.log(`Created ${dronesFromDb.lenght} drones`)
      mongoose.disconnect(() => console.log('Connection'))
  })
  .catch((err) => console.log(err));