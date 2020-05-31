
$(document).ready(function(){
    console.log("products.client.js ready");

    let $productCard = $('.thumbnailGroup .card')
    for (let i=0;i<$productCard.length;i++) {
        let $productStatus = $productCard.eq(i).find('.card-title span');
        let status = $productStatus[0].innerHTML;

        if (status=='New') {
            $productStatus.eq(0).addClass('badge-primary');
        } else if (status=='Old') {
            $productStatus.eq(0).addClass('badge-secondary');
        } else if (status=='In Stock') {
            $productStatus.eq(0).addClass('badge-success');
        } else if (status=='Out of Stock') {
            $productStatus.eq(0).addClass('badge-danger');
        } else if (status=='Offer' || status=='Sale' || status=='Discount') {
            $productStatus.eq(0).addClass('badge-warning');
        } else if (status=='') {
            // let date = $productCard.eq(i).find('p.hiddenElement')[0].innerHTML;
            let date = $productCard.eq(i).attr('data-productDate');
            if (date!='') {
                let date1 = new Date(date);
                let date2 = new Date();

                let days = (date2-date1)/1000/60/60/24;
                if (days<5) {
                    $productStatus[0].innerHTML='New';
                    $productStatus.eq(0).addClass('badge-primary');
                }
            }
        }
    }
    
});