var password = document.querySelectorAll(".password");
var deleteBtn = document.querySelectorAll(".delete");
window.addEventListener('load', () => {
    for (let i = 0; i < password.length; i++) {
        password[i].innerHTML = '********';
    }
});
