fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then((response) => response.json())
    .then((data) => {
        console.log(...data);
    })
    .catch((error) => {
        console.error(error);
    });

document.querySelector(".presentacion").addEventListener("wheel", function () {
    window.scrollTo({
        top: document.querySelector("#body").offsetTop,
        behavior: "smooth",
    });
    document.querySelector(".presentacion").style.display = "none";
});
