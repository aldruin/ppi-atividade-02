import express from "express";
import pacotesRouter from "./routes/pacotes.js";
import session from "express-session";
import autenticar from "./security/auth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "s3gr3d0",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

app.use(express.json());


//login routes
app.get("/login", (req, res) => {
  resposta.redirect('/login.html');
})

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  const redirectTo = req.session.redirectTo || '/';

  if (usuario === "admin" && senha === "admin") {
    req.session.autenticado = true;
    res.redirect(redirectTo);
  } else {
    res.redirect('/login.html');
  }
});

app.get("/logout", (req, res) => {
  res.session.destroy();
  res.redirect('/login.html');
});

app.use("/pacotes", pacotesRouter);
app.use(express.static('src/views/public'));
app.use(autenticar, express.static('src/views/private'));



export default app;