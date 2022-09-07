import pkg from "mongoose";
const { Schema, model } = pkg;

const UtilisateurSchema = new Schema({
  prenom: { type: String, required: true },
  score: { type: Number, default: 0 },
  flags: { type: Number, default: 0 }
});

const Utilisateur = model("utilisateurs", UtilisateurSchema);

export default Utilisateur;