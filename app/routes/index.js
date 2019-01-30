const flightRoutes = require('./flight_routes');
module.exports = function(app, db) {
  flightRoutes(app, db);
  // Other route groups could go here, in the future
};
