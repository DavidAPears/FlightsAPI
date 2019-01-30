module.exports = function(app, db) {
  app.post('/flights', (req, res) => {
    // a flight will be created here.
    res.send('Hello')
  });
};
