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
                    userName: 'user'+Math.floor(Math.random()*100),
                    userDP: (Math.floor(Math.random()*5)+1),
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
                    window.location.reload();
                }
            });
    });
});