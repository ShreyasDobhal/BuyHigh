
$(document).ready(function() {
    console.log("client.js ready");

    $('#btnSignIn').on('click',function() {
        console.log('Sign in button clicked');
        $('#signInModal').modal('show');
    });

    $('#btnLogin').on('click',function() {
        console.log('Log in button clicked');

        let txtEmail = $('#modalEmailInput').val();
        let txtPassword = $('#modalPasswordInput').val();

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

    $('#btnLogout').on('click',function(){
        console.log('Logout button clicked');

        $.ajax({
            url: "/user/logout",
            type: "POST",
            data: {
                
            },
            success: function(result) {
                window.location.reload();
            },
            error: function(err) {
                alert('Failed to logout');
            }
        });
    });

    $('#btnExploreCategories').on('click',function() {
        console.log('Explore more categories button clicked');
        window.location.href = '/home';
    });

    $("#txtSearch").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btnSearch").click();
        }
    });

    $('#btnSearch').on('click',function(){
        console.log('Search button clicked');
        let searchQuery = $('#txtSearch').val().trim();
        if (searchQuery!='') {
            window.location.href = '/products/search/'+searchQuery;
        }
    });
    
    $('.productSpan').on('click',function() {
        console.log('productSpan clicked');

        let proId = $(this).attr('data-productId');
        window.location.href = '/products/view/'+proId;
    });

    $('.sellerSpan').on('click',function() {
        console.log('sellerSpan clicked');

        let sellerId = $(this).attr('data-sellerId');
        window.location.href = '/user/products/'+sellerId;
    });

});