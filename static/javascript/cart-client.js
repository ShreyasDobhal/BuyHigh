$(document).ready(function() {
    console.log('cart-client.js ready');

    $('.deleteBtn').on('click',function() {
        console.log('delete button clicked');

        let proId = $(this).attr('data-productId');
        console.log(proId);
        
        $.ajax({
            url: "/user/product",
            type: "DELETE",
            data: {
                productId: proId
            },
            success: function(result) {
                window.location.reload();
            },
            error: function(err) {
                alert('Failed to remove product');
            }
        });
    });

    $('#buyBtn').on('click',function() {
        console.log('Buy button clicked');

        // TODO Add product to orders
        let userId = $(this).attr('data-userId');
        console.log(userId);
    });
});