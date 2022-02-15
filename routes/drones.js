const express = require('express');
const DroneModel = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  DroneModel.find()
  .then((allDrones) => {
    console.log(allDrones);
    res.render('drones/list.hbs', { drones: allDrones});
  })
  .catch((err) => {
    next(err);
  })
});



router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form.hbs');

});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;
console.log(req.body)
  DroneModel.create({name, propellers, maxSpeed})
  .then((createDrone) => {
    console.log('Drone created', createDrone.name)
    res.redirect('/drones')
  })
  .catch((err) => next(err))
});





router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {droneId} = req.params;
  DroneModel.findById(droneId)
  .then((foundDrone) => {
    res.render('drones/update-form', { drone: foundDrone});
  })
  .catch((err) => {
    next(err);
  })
});


router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {droneId} = req.params;
  const {name, propellers, maxSpeed} = req.body;

  DroneModel.findByIdAndUpdate(droneId, {name, propellers, maxSpeed})
  .then((updatedDrone) => {
    res.redirect(`/drones`);
  })
  .catch((err) => {
    next(err);
  })
});





router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const {droneId} = req.params;

  DroneModel.findByIdAndDelete(droneId)
  .then(() => {
    res.redirect('/drones');
  })
  .catch((err) => {
    next(err);
  })
});

module.exports = router;
