window.addEventListener("load", () => {
    const envelope = document.getElementById("red-envelope");
    if (!envelope) return;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            envelope.classList.add("open");
            setTimeout(() => envelope.remove(), 1700);
        });
    });
});