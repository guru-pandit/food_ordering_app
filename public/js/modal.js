let modal = document.getElementById("dialog-modal");
let closeIcon;

//<a href="#" class="modal-btn modal-btn-green">Ok</a>
//<a href="#" class="modal-btn modal-btn-red">Ok</a>

// Function to open modal
function openModal(type, msg, callback) {
    // modal.style.display = "block"
    $("#dialog-modal").addClass("active").empty()

    let successTemplateString = `<div class="mymodal-content modal-content-success" id="modal-content">
                            <i class="fa fa-times btn-circular" id="close-icon"></i>
                            <div class="modal-cont modal-cont-success">
                                <div class="modal-icon">
                                    <i class="fa fa-thumbs-up"></i>
                                </div>
                                <h3 class="modal-head" id="modal-text">Success</h3>
                                <p class="modal-text" id="modal-text">${msg}</p>
                                </div> 
                        </div>`

    let errorTemplateString = `<div class="mymodal-content modal-content-error">
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
        $("#dialog-modal").append(successTemplateString)
    } else {
        $("#dialog-modal").append(errorTemplateString)
    }
    closeIcon = document.getElementById("close-icon");

    closeIcon.onclick = function () {
        $("#dialog-modal").removeClass("active")
        typeof callback === 'function' && callback()
    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // console.log(event)
    // console.log(event.target)
    if (event.target == modal) {
        $("#dialog-modal").removeClass("active")
    }
}


// Review modal stars
$("input[name='review-rating']").click(function () {
    let sim = $("input[name='review-rating']:checked").val();
    // alert(sim)
    if (sim < 3) {
        // $('.myratings').css('color', 'red');
        $("#selected-rating").text(sim);
    } else {
        // $('.myratings').css('color', 'green');
        $("#selected-rating").text(sim);
    }
});

$(".review-modal-rating").on("reset", () => {
    $("#selected-rating").text("0");
})

// Review modal js
$("#open-review-modal").click(function () {
    $("#review-modal").addClass("review-modal-active");
})

$("#close-review-modal").click(function () {
    $("#review-modal").removeClass("review-modal-active");
})

$("#review-submit").click(function (e) {
    e.preventDefault()
    let ratingValue = $("input[name='review-rating']:checked").val();
    let comment = $("#review-comment").val()

    let stars = isNaN(parseFloat(ratingValue)) ? 0 : parseFloat(ratingValue)

    const data = {
        stars: stars,
        comment: comment
    }

    console.log(data)

    axios.post(`${baseUrl}/addnewreview?restaurantId=${restaurantId}`, data).then(res => {
        // console.log("Review-Response: ", res)
        // console.log(res.request.responseURL)
        // alert("Your Review has been successfully submitted.");
        openModal("success", "Review submitted successfully", () => {
            $("#review-modal").removeClass("review-modal-active");
        })
        // $("#review-modal").removeClass("review-modal-active");
    }).catch(err => {
        // alert(err.response.data.error)
        window.location = `${baseUrl}/login`
        // openModal("error", "Review not submitted")
    })
})
