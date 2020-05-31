
$(document).ready(function() {
    console.log("home-client.js ready");

    $('.thumbnailGroup .card').on('click',function(){
        console.log('Category card clicked');
        let $card = $(this);
        let category = $card.attr('data-category');
        window.location.href = '/category/'+category;
    });
});


    // background: #efefef;
    // border: 2px solid #a39696;
    // box-shadow: 8px 8px 9px 0px #656464;