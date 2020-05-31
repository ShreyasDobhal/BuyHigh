
$(document).ready(function(){
    console.log('category-page-client.js ready');

    $('.thumbnailGroup .card').on('click',function(){
        console.log('Product clicked');
        let $card = $(this);
        let proId = $card.attr('data-productId');
        window.location.href = '/products/view/'+proId;
    });
});