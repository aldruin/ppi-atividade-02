import express from "express";
import pacotesRouter from "./routes/pacotes.js";
import clientesRouter from "./routes/clientes.js";
import ClienteController from "./controller/ClienteController.js";
import session from "express-session";
import autenticar from "./security/auth.js";

const app = express();

app.use(session({
  secret: "s3gr3d0",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));
app.use(express.urlencoded({ extended: true }));


app.use(express.json());


//login routes

app.get('/verificar-sessao', (req, res) => {
  if (req.session && req.session.autenticado) {
    return res.json({ autenticado: true });
  }
  return res.json({ autenticado: false });
});

app.get("/login", (req, res) => {
  if (req.session?.autenticado) {
    return res.redirect('/index.html');
  }
  res.render('login');
})

app.post("/login", ClienteController.login);

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao finalizar a sessão' });
    }
    res.redirect('/index.html');
  });
});

app.use("/pacotes", pacotesRouter);
app.use("/clientes", clientesRouter);
app.use(express.static('src/views/public'));
app.use(autenticar, express.static('src/views/private'));



export default app;