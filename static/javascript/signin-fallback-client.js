$(document).ready(function(){
    console.log('signin-fallback-client.js ready');

    $('#signInButton').on('click',function(){
        console.log('Signin Button clicked');

        let txtEmail = $('#inputEmail').val();
        let txtPassword = $('#inputPassword').val();

        $.ajax({
            url: "/user/signin",
            type: "POST",
            data: {
                email: txtEmail,
                password: txtPassword
            },
            success: function(result) {
                window.location.reload();
            },
            error: function(err) {
                alert('Failed to sign in');
            }
        });
    });
});
