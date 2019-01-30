var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

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

app.get('/flights/:flightNo', (req, res) => {
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

app.delete('/flights/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('flights').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Flight ' + id + ' deleted!');
      }
    });
  });

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
