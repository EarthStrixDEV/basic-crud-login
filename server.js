const express = require("express");
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const { render } = require("ejs");
const app = express();
const port = 7000;

app.use(express.static(path.join(__dirname, "./frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// set middleware ejs
app.set("view engine", "ejs");
app.set("views", "./frontend");

app.get("/home", (req, res) => {
  res.render("home", { title: req.session.username });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/login.html"));
});

app.get("/registerPage", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/register.html"));
});

app.get("/admin", (req, res) => {
  try {
    connector.query(`SELECT * FROM users`, (err, result) => {
      if (err) throw err;
      res.render("admin", { result });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.get("/edit/:id", (req, res) => {
  try {
    connector.query(
      `SELECT * FROM users WHERE id = ${ req.params.id }`,
      (err, result) => {
        if (err) throw err;
        res.render("form_update", { result });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

const connector = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_data",
});

connector.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/insert", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  try {
    connector.query(
      `INSERT INTO users (email, fullname, password) VALUES ('${email}', '${name}', '${password}')`,
      (err, result) => {
          if (err) { throw err; }
          res.redirect("/");
        console.log(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post("/update", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const id = req.body.id;
  try {
    connector.query(
      `UPDATE users SET email = '${ email }', fullname = '${ name }', password = '${ password }' WHERE id = ${ id }`,
      (err, result) => {
        if (err) throw err;
        res.redirect("/");
        console.log(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  try {
    connector.query(`DELETE FROM users WHERE id = ${ id }`, (err, result) => {
      if (err) throw err;
      res.redirect("/");
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    connector.query(
      `INSERT INTO users (email, fullname, password) VALUES ('${ email }', '${ name }', '${ password }')`,
      (err, result) => {
        if (err) throw err;
        res.redirect("/");
        console.log(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    connector.query(`SELECT * FROM users WHERE email = '${ email }' AND password = '${ password }'`, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.username = result[0].fullname;
        res.redirect("/home");
      } else {
        res.send('<script>alert("Email or Password is incorrect!"); window.location.href = "/";</script>');
      }
  });
  } catch (error) {
    console.log(error);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
