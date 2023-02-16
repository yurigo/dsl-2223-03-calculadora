const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("");
});

function extractNumbers(req, res, next) {
  const num1 = parseFloat(req.query.a);
  const num2 = parseFloat(req.query.b);

  req.NUM1 = num1;
  req.NUM2 = num2;

  // if (num1 === 30) return res.json({ error: "error" });

  next();
}

function isNum2Zero(req, res, next) {
  if (req.NUM2 === 0) next("has dividido por 0...");
  next();
}

function errorHandler(err, req, res, next) {
  console.log("xxxxxx", err);
  res.status(404).json({ error: err });
}

app.use(extractNumbers);

app.get("/suma", (req, res) => {
  const resultado = {
    resultado: req.NUM1 + req.NUM2,
  };

  res.json(resultado);
});

app.use(extractNumbers);

app.get("/resta", (req, res) => {
  const resultado = {
    resultado: req.NUM1 - req.NUM2,
  };

  res.json(resultado);
});

app.get("/multiplica", (req, res) => {
  const resultado = {
    resultado: req.NUM1 * req.NUM2,
  };

  res.json(resultado);
});

app.get("/divide", isNum2Zero, (req, res) => {
  // if (num2 === 0) return res.json({ resultado: "no dividas por 0" });

  const resultado = {
    resultado: req.NUM1 / req.NUM2,
  };

  res.json(resultado);
});

app.use(function (err, req, res, next) {
  console.log("xxxxxx", err);
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(404).json({ error: err });
});

app.listen(port, () => {
  const protocol = "http";
  const url = "127.0.0.1";

  console.log("listening in " + protocol + "://" + url + ":" + port);

  console.log(`listening in ${protocol}://${url}:${port}`);
  console.log(`listening in ${protocol}://${url}:${port}/suma?a=1&b=2`);
});
