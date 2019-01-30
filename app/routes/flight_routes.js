var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
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
