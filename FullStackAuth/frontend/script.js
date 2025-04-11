async function register() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    const res = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Registered! Login now");
        window.location.href = "index.html";
    } else {
        alert(data.message);
    }

};

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //  "Hey backend! I'm sending data in JSON format." This sets the Content-Type HTTP header — the backend uses this to know how to parse the incoming request. In Express.js, when you use app.use(express.json()), this header lets the backend correctly parse req.body.

        body: JSON.stringify({ username, password }), // "Take this JavaScript object and convert it into a JSON string." Because fetch() only sends strings in the body — not JavaScript objects — you have to manually convert the object:
    });

    const data = await res.json();
    if(res.ok){
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
}