let modal = document.getElementById("myModal");
let closeIcon;

//<a href="#" class="modal-btn modal-btn-green">Ok</a>
//<a href="#" class="modal-btn modal-btn-red">Ok</a>

// Function to open modal
function openModal(type, msg) {
    // modal.style.display = "block"
    $("#myModal").addClass("active").empty()

    let successTemplateString = `<div class="modal-content modal-content-success" id="modal-content">
                            <i class="fa fa-times btn-circular" id="close-icon"></i>
                            <div class="modal-cont modal-cont-success">
                                <div class="modal-icon">
                                    <i class="fa fa-thumbs-up"></i>
                                </div>
                                <h3 class="modal-head" id="modal-text">Success</h3>
                                <p class="modal-text" id="modal-text">${msg}</p>
                               
                                </div> 
                        </div>`

    let errorTemplateString = `<div class="modal-content modal-content-error">
                                    <i class="fa fa-times btn-circular" id="close-icon"></i>
                                    <div class="modal-cont modal-cont-error">
                                        <div class="modal-icon">
                                            <i class="fa fa-thumbs-down"></i>
                                        </div>
                                        <h3 class="modal-head" id="modal-text">Error</h3>
                                        <p class="modal-text" id="modal-text">${msg}</p>
                                    </div> 
                            </div>`
    if (type === "success") {
        $("#myModal").append(successTemplateString)
    } else {
        $("#myModal").append(errorTemplateString)
    }
    closeIcon = document.getElementById("close-icon");

    closeIcon.onclick = function () {
        $("#myModal").removeClass("active")
    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // console.log(event)
    // console.log(event.target)
    if (event.target == modal) {
        $("#myModal").removeClass("active")
    }
}

