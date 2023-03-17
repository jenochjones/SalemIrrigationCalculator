function ready(readyListener) {
    if (document.readyState !== "loading") {
        readyListener();
    } else {
        document.addEventListener("DOMContentLoaded", readyListener);
    }
};

ready(function () {
    console.log('ready');
    document.getElementById("lot-size").addEventListener("input", (event) => {
        console.log(event.target.value);
    })
});
