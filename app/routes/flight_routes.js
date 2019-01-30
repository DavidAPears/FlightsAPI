var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

// FIND ALL FLIGHTS:
app.get('/flights', (req, res) => {
    db.collection('flights').find({}).toArray(function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
        } else {
          res.send(result);
          console.log("Find:", result);
        }
      });
    });
// END POINT EXAMPLE: "localhost:8000/flights"


// FIND ALL DEPARTURES:
app.get('/flights/departures', (req, res) => {
  const type = "D"
    db.collection('flights').find({ ArrDep: type}).toArray(function(err, items)  {
      if (err) {
        res.send({'error':'An error has occurred'});
        } else {
          res.send(items);
          console.log("Find:", items);
        }
      });
    });
// END POINT EXAMPLE: "localhost:8000/flights/departures"


// FIND ALL ARRIVALS:
app.get('/flights/arrivals', (req, res) => {
  const type = "A"
    db.collection('flights').find({ ArrDep: type}).toArray(function(err, items)  {
      if (err) {
        res.send({'error':'An error has occurred'});
        } else {
          res.send(items);
          console.log("Find:", items);
        }
      });
    });
// END POINT EXAMPLE: "localhost:8000/flights/arrivals"


// FIND BY FLIGHT NUMBER:
app.get('/flights/flight/:flightNo', (req, res) => {
  const flightNo = req.params.flightNo;
    db.collection('flights').findOne({ FlightNo: flightNo}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
        } else {
          res.send(item);
          console.log("Find:", item);
        }
      });
    });
// END POINT EXAMPLE: "localhost:8000/flights/flight/UX3613"


// FIND BY ID:
app.get('/flights/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
    db.collection('flights').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
// END POINT EXAMPLE: "localhost:8000/flights/5c51ba60f428dc3d24b05273"


// ADD FLIGHT:
app.put('/flights/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const flight = {
      FlightNo:   req.body.FlightNo,
      Date:       req.body.Date,
      DTime:      req.body.Time,
      ArrDep:     req.body.ArrDep,
      PortOfCall: req.body.PortOfCallA,
      Status:     req.body.Status,
      Other:      req.body.OtherInfo,
      Additional: req.body.Addittional,
      Airline:    req.body.Airline,
      Image:      req.body.Image,
      Arrival:    req.body.ArrHall
     };
    db.collection('flights').update(details, flight, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(flight);
      }
    });
  });

//EDIT FLIGHT:
app.post('/flights', (req, res) => {
  const flight = {
    FlightNo:   req.body.FlightNo,
    Date:       req.body.Date,
    DTime:      req.body.Time,
    ArrDep:     req.body.ArrDep,
    PortOfCall: req.body.PortOfCallA,
    Status:     req.body.Status,
    Other:      req.body.OtherInfo,
    Additional: req.body.Addittional,
    Airline:    req.body.Airline,
    Image:      req.body.Image,
    Arrival:    req.body.ArrHall
   };
    db.collection('flights').insert(flight, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
