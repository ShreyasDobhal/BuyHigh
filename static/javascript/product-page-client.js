$(document).ready(function() {
    console.log('product-page-client.js ready');

    $('#btnAddReview').on('click',function(){
        console.log('Add Review clicked');
        let rating = document.getElementById('inputRating').value;
        let review = document.getElementById('inputReview').value.trim();
        if (review!='') {
            // Add a review
            console.log('Sending POST request for review');
            $.ajax({
                url: "/products/addreview",
                type: "POST",
                data: {
                    proId: $('#objProduct').attr('data-id'),
                    rating: rating,
                    review: review
                },
                success: function(result) {
                    // Successful
                }
            });
        }

        // Adding rating 
        console.log('Sending POST request for rating');
            $.ajax({
                url: "/products/addrating",
                type: "POST",
                data: {
                    proId: $('#objProduct').attr('data-id'),
                    rating: rating
                },
                success: function(result) {
                    alert('Your feedback has been added');
                    window.location.reload();
                },
                error: function(err) {
                    alert('Failed to add your feedback');
                }
            });
    });


    $('#btnAddCart').on('click',function(){
        console.log('Add to Card clicked');
        
        let $product = $('#objProduct');
        $.ajax({
            url: "/user/addcart",
            type: "POST",
            data: {
                productId: $product.attr('data-id'),
                productName: $product.attr('data-title'),
                productThumbnail: $product.attr('data-thumbnail'),
                sellerId: $product.attr('data-sellerId'),
                sellerName: $product.attr('data-seller'),
                price: $product.attr('data-price'),
                rating: $product.attr('data-rating')
            },
            success: function(result) {
                alert('Added to cart');
            },
            error: function(err) {
                alert('Failed to add to cart');
            }
        });
            
    });

    $('#btnCheckOut').on('click',function(){
        console.log('Add to Card clicked');
        
        let $product = $('#objProduct');
        $.ajax({
            url: "/user/addcart",
            type: "POST",
            data: {
                productId: $product.attr('data-id'),
                productName: $product.attr('data-title'),
                productThumbnail: $product.attr('data-thumbnail'),
                sellerId: $product.attr('data-sellerId'),
                sellerName: $product.attr('data-seller'),
                price: $product.attr('data-price'),
                rating: $product.attr('data-rating')
            },
            success: function(result) {
                window.location.href = '/user/cart';
            },
            error: function(err) {
                alert('Failed to add to cart');
            }
        });
            
    });

});