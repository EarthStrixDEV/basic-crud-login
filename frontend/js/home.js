let admin = document.querySelector("#admin");
let post_admin = document.querySelector('#post_admin')

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

post_admin.addEventListener('click', (event) => {
    let pass = prompt("Enter password");
    if (pass === "admin") {
        event.target.href = "/postAdmin";
    } else if (pass == null) {
        return;
    } else {
        event.stopPropagation()
        alert("Incorrect password");
    }
})