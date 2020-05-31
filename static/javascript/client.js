
$(document).ready(function() {
    console.log("client.js ready");

    $('#btnSignIn').on('click',function() {
        console.log('Sign in button clicked');
        $('#signInModal').modal('show');
    });

    $('#btnExploreCategories').on('click',function() {
        console.log('Explore more categories button clicked');
        window.location.href = '/home';
    });

    $('#btnSearch').on('click',function(){
        console.log('Search button clicked');
        let searchQuery = $('#txtSearch').val().trim();
        if (searchQuery!='') {
            window.location.href = '/products/search/'+searchQuery;
        }
    });

});