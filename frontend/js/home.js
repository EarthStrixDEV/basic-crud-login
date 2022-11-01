let admin = document.querySelector("#admin");

admin.addEventListener("click", (event) => {
    let pass = prompt("Enter password");
    if (pass === "admin") {
        event.target.href = "/admin";
    } else if (pass == null) {
        return;
    } else {
        event.stopPropagation()
        alert("Incorrect password");
    }
});