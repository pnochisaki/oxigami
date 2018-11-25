
$(function () {

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


    $('input[type="number"]').val(qty);
    $('input[type="number"]').trigger("change");


});