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

        let userId = $(this).attr('data-userId');
        
        $.ajax({
            url: "/user/addorder",
            type: "POST",
            data: {
                userId: userId
            },
            success: function(result) {
                
                console.log('Successfully added products to orders');

                $.ajax({
                    url: "/user/clearcart",
                    type: "DELETE",
                    data: {},
                    success: function(result) {
                        alert('Product added to orders successfully');
                        window.location.reload();
                    },
                    error: function(err) {
                        alert('Failed to remove items from cart');
                    }
                });
            },
            error: function(err) {
                alert('Failed to add products to orders');
            }
        });

    });
});