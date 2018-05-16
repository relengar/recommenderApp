const express = require("express");
module.exports = (app, expressWs) => {
  app.all('*' , (req, res, next) => {
    let re = /.user|comment|review|company*/g;
    let methods = ["POST", "DELETE"];
    if (methods.indexOf(req.method) !== -1 && !req.isAuthenticated() && req.path.search(re) != -1) {
      res.status(401).send("Unauthorized");
    }
    else {
      next();
    }
  });

  let ratingWss = expressWs.getWss('/rating');
  app.ws('/rating', (ws, req) => {
    ws.on('close', evt => {
      console.log(evt);
    })
  });
  require('./user.js')(app);
  require('./company.js')(app);
  require('./discussion.js')(app, ratingWss);

  app.get('*', (req, res) => {
    res.status(200).sendFile('/dist/index.html', {root: __dirname + '/..'}, err => {
      res.status(500).send(err);
    })
  });
};
