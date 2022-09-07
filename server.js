'use strict';

// -- -- -- -- -- -- -- -- --  -- IMPORTS -- -- -- -- -- -- -- -- --  -- \\

import express from "express";
import mongoose from "mongoose";
import auth from "./backend/middleware/auth.js";
import UtilisateurModel from "./backend/models/utilisateur.js";

// -- -- -- -- -- -- -- -- --  -- ROUTES -- -- -- -- -- -- -- -- --  -- \\

import adminRoutesAPI from "./backend/routes/api/admin.js";
import challengesRoutes from "./backend/routes/routing/challenges.js";

// -- -- -- -- -- -- -- -- --  -- CONFIG -- -- -- -- -- -- -- -- --  -- \\

const app = express();

app.set("view engine", "ejs");
app.set("views", "./frontend/views");

app.use('/static', express.static('frontend/assets'));
app.use(express.json({ type: "text/plain", limit: "5mb" }));

// -- -- -- -- -- -- -- -- --  -- DATABASE -- -- -- -- -- -- -- -- --  -- \\

mongoose
  .connect('mongodb://localhost/ctf_avent', { useNewUrlParser: true })
  .then(() => console.log("Connecté à MongoDB..."))
  .catch((err) => console.log(err));

// -- -- -- -- -- -- -- -- --  -- ROUTING API -- -- -- -- -- -- -- -- --  -- \\

app.use("/api/admin", adminRoutesAPI);

// -- -- -- -- -- -- -- -- --  -- ROUTING NORMAL -- -- -- -- -- -- -- -- --  -- \\

// Page d'accueil
app.get("/", async (req, res) => {
  const utilisateurs = await UtilisateurModel.find().sort({ score: -1 });
  res.render("scoreboard", {
    data: utilisateurs
  });
});

// Page d'administrateur
app.get("/admin", auth, async (req, res) => {
  const utilisateurs = await UtilisateurModel.find().sort({ score: -1 });
  res.render("admin", {
    data: utilisateurs
  });
});

// Page des challenges
app.use("/challenges", challengesRoutes);

// Page de secret
app.get("/flag", (req, res) => {
  res.render("challenges/secret");
});

// -- -- -- -- -- -- -- -- --  -- DEMARRAGE SERVEUR -- -- -- -- -- -- -- -- --  -- \\

app.listen(8003, () => console.log(`Server started on http://localhost:8003`));
