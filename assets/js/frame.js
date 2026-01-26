setTimeout(() => {
    document.getElementById('helloFrame')?.classList.add('show');
}, 5000);

document.getElementById('closeHello')?.addEventListener('click', () => {
    document.getElementById('helloFrame').classList.remove('show');
});