
$(document).ready(function(){
    console.log('user-products-clients.pug');

    let userId = $('.thumbnailGroup').attr('data-userId');
    let currentURL = '/user/products/'+userId;

    $('.deleteBtn').on('click',function() {
        console.log("Delete button clicked");

        let sureFlag = confirm("Are you sure u want to delete this product");

        if (sureFlag) {
            let proId = $(this).attr('data-id');
            console.log('DELETE : /products/delete/'+proId);
            $.ajax({
                type:'DELETE',
                url:'/products/delete/'+proId,
                success: function(res) {
                    
                },
                error: function(err) {
                    console.log(err);
                }
            });
            window.location.href=currentURL;

        } else {
            window.location.href=currentURL;
        }
        
    });
});