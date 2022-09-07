import { Router } from "express";
import auth from "../../middleware/auth.js";

const router = Router();

router.get("/ch01", (req, res) => {
    res.cookie("NID", "SmVOZVN1aXNQYXNVbk1vdERlUGFzc2U", {
        httpOnly: true,
        secure: true,
        maxAge: 600000,
    }, { encode: String });
    res.render("challenges/ch01");
});

router.post("/ch01", async (req, res) => {
    var { password } = req.body;
    if (password === "JeNeSuisPasUnMotDePasse") {
        res.status(200).json({ OK: true, message: "Voici ton flag mon frérot : flag{RobinLePlusBeau:smirk:}" });
    } else {
	const phrases = ["Bon après GazMachine a mis +1h", "Voici ton flag : toujours pas ça mdr", "PTDRRRRRRRRRRRRRRRRRRRRRRRRRRR", "Pas le bon mot de passe :~)", "Toujours pas mon frérot", "T'es un P4 ?", "Laisse tomber c'est pas ton lvl", "Même François il a trouvé sérieux"];
        
	res.status(200).json({ OK: false, message: phrases[Math.floor(Math.random()*phrases.length)]});
    };
});

router.get("/ch02", (req, res) => {
    res.render("challenges/ch02");
});

router.get("/*", (req, res) => {
    res.render("challenges/erreur404");
})

export default router;
