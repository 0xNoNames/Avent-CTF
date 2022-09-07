import { Router } from "express";
import UtilisateurModel from "../../models/utilisateur.js";
import auth from "../../middleware/auth.js"

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const Utilisateurs = await UtilisateurModel.find();
    res.status(200).json(Utilisateurs);
  } catch (erreur) {
    console.log("get('/') from /routes/api/admin.js : ", erreur);
    res.erreur(404).json({ message: erreur.message });
  }
});

router.post("/", auth, async (req, res) => {
  var { prenom, score, flags } = req.body;
  if (score == "")
    score = 0; 
  if (flags == "")
  flags = 0;
  try {
    await UtilisateurModel.create({ prenom, score, flags });
    res.sendStatus(200);
    res.status(200);
  } catch (erreur) {
    console.log("post('/') from /routes/api/admin.js : ", erreur);
    res.status(500).json({ message: erreur.message });
  };
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await UtilisateurModel.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (erreur) {
    console.log("delete('/id') from /routes/api/admin.js : ", erreur);
    res.status(500).json({ message: erreur.message });
  };
});

router.put("/:id", auth, async (req, res) => {
  try {
    await UtilisateurModel.updateOne({ _id: req.params.id }, { $set: { score: req.body.score, flags: req.body.flags } });
    res.sendStatus(200);
  } catch (erreur) {
    console.log("put('/:id:score') from /routes/api/admin.js : ", erreur);
    res.status(500).json({ message: erreur.message });
  };
});

export default router;
