"use strict";
// -- -- -- -- -- -- -- -- -- -- Partie FETCH -- -- -- -- -- -- -- -- -- -- //

var form = document.getElementById("newForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("/ctf-avent/api/admin/", {
            method: "POST",
            body: JSON.stringify({ prenom: form.newPrenom.value, score: form.newScore.value, flags: form.newFlags.value }),
            mode: "cors",
            credentials: "include",
        });
        if (response.status == 200) {
            location.reload();
        } else {
            document.getElementById("messageErreur").innerHTML = data.message;
            setTimeout(() => {
                document.getElementById("messageErreur").innerHTML = "";
            }, 5000);
        }
    } catch (erreur) {
        console.log(erreur);
    }
});

const deleteUtilisateur = async (element) => {
    try {
        const response = await fetch("/ctf-avent/api/admin/" + element.parentNode.parentNode.id, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
        });
        const data = await response.json;
        if (response.status == 200) {
            location.reload();
        } else {
            document.getElementById("messageErreur").innerHTML = data.message;
            setTimeout(() => {
                document.getElementById("messageErreur").innerHTML = "";
            }, 5000);
        }
    } catch (erreur) {
        console.log(erreur);
    }
}

const updateScore = async (element) => {
    let score = prompt("Entrez le score :");
    if (score != null && score != "") {
        let flags = prompt("Entrez le nombre de flags :");
        try {
            const response = await fetch("/ctf-avent/api/admin/" + element.parentNode.parentNode.id, {
                method: "PUT",
                body: JSON.stringify({ score: score, flags: flags }),
                mode: "cors",
                credentials: "include",
            });
            const data = await response.json;
            if (response.status == 200) {
                location.reload();
            } else {
                document.getElementById("messageErreur").innerHTML = data.message;
                setTimeout(() => {
                    document.getElementById("messageErreur").innerHTML = "";
                }, 5000);
            }
        } catch (erreur) {
            console.log(erreur);
        }
    }
}