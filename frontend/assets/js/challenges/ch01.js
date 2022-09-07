var form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("/ctf-avent/challenges/ch01", {
            method: "POST",
            body: JSON.stringify({ password: form.password.value }),
            mode: "cors",
            credentials: "include",
        });
        const data = await response.json();
        if (data.OK) {
            document.getElementById("message").innerHTML = data.message;
            document.getElementById("message").style.color = "chartreuse";
            var audio = document.createElement("audio");
            audio.autoplay = true;
            audio.load()
            audio.addEventListener("load",() => {
                audio.play(); }, true);
            audio.src = "/ctf-avent/static/pierre.mp3";
            audio.volume = 0.1;
    	} else {
            document.getElementById("message").innerHTML = data.message;
	    document.getElementById("message").style.color = "white";
            var audio = document.createElement("audio");
	    if (Math.random() < 0.2)
		audio.autoplay = true;
	    audio.load();
            audio.addEventListener("load",() => {
		audio.play(); }, true)
            audio.src = "/ctf-avent/static/monke.mp3";
            audio.volume = 0.1;
        }
    } catch (erreur) {
        console.log(erreur);
    }
});
