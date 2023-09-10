const time = document.getElementById("time-view");

setInterval(() => {
    const d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000)