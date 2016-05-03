

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#verifyPassword").val();

    if (password == confirmPassword)
    {
        $("#marker").html('<img src="https://cdn3.iconfinder.com/data/icons/freeapplication/png/24x24/Apply.png" />');
    }

    else
    {
        $("#marker").html('<img src="https://cdn3.iconfinder.com/data/icons/musthave/16/Delete.png" />');
    }

}

$(document).ready(function () {
    $(document).on('keyup','#verifyPassword', checkPasswordMatch );
});