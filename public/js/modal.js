let modal = document.getElementById("myModal");
let closeIcon = document.getElementById("close");

// Function to open modal
function openModal(msg) {
    $("#modal-text").text(msg)
    modal.style.display = "block"
}

// When the user clicks on <span> (x), close the modal
closeIcon.onclick = function () {
    //console.log("clicked")
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // console.log(event)
    // console.log(event.target)
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
