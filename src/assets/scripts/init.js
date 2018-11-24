
$(function () {

    var handler = StripeCheckout.configure({
        key: 'pk_live_aqqrWSGqwzp5AH0IkoKypeb2',
        image: '/assets/img/star-white.jpg',
        locale: 'auto',
        token: function (token) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
        }
    });

    var description = "Origami Christmas Stars"
    var qty = 1
    var amount = 300
    var total = qty * amount
    var hash = window.location.hash.substr(1);
    
    if (hash) {
        qty = hash;
    }

    $('#price').text(total/100);
    
    $('input[type="number"]').on('change', function () {
        qty = $(this).val();

        if (qty > 1) {
            amount = 250
            description_text = qty + ' ' + description
        } else {
            amount = 300
            description_text = description
        }

        total = qty * amount;

        $('#price').text(total/100);

    });

    document.getElementById('customButton').addEventListener('click', function (e) {

        // Open Checkout with further options:
        handler.open({
            name: 'Oxigami',
            description: description_text,
            amount: total,
            shippingAddress: true
            
        });
        e.preventDefault();
    });

    // Close Checkout on page navigation:
    window.addEventListener('popstate', function () {
        handler.close();
    });

    $('input[type="number"]').val(qty);
    $('input[type="number"]').trigger("change");


});