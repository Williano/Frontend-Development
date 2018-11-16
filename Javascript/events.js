function dis() {
    var text = document.getElementById("email");
    alert(text.value);
}

var button = document.getElementById("reset-button");
button.addEventListener('click', dis);