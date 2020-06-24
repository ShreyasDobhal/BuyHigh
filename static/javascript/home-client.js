
$(document).ready(function() {
    console.log("home-client.js ready");

    $('.thumbnailGroup .card').on('click',function(){
        console.log('Category card clicked');
        let $card = $(this);
        let category = $card.attr('data-category');
        window.location.href = '/category/'+category;
    });
});