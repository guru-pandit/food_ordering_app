$(".profile-menu-links .menu-link").click(function () {
    let tabid = $(this).find("a").attr("href");
    console.log(tabid);
    $(".profile-menu-links .menu-link, .profile-content-wrapper div.profile-content").removeClass("active");   // removing active class from tab
    $(".profile-content-wrapper .profile-content").removeClass("active");   // hiding open tab
    $(tabid).addClass("active");    // show tab
    $(this).addClass("active"); //  adding active class to clicked tab
});

function openEditModal() {
    $("#edit-modal-container").addClass("active");
}

function closeEditModal() {
    $("#edit-modal-container").removeClass("active");
}

