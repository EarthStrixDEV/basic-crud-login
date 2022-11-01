let input_date = document.getElementById("date")
let date = new Date()

input_date.value = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()