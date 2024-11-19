function openMessage(number) {
    const messageDiv = document.getElementById(`message${number}`);
    if (messageDiv.style.display === "none") {
        messageDiv.style.display = "block";
    } else {
        messageDiv.style.display = "none";
    }
}
