$(document).ready(function() {

    $('.formedit').submit(function(e) {
        e.preventDefault();
        var url = $(this).attr('action');
        var data = $(this).serialize();

        $.ajax({
            url: url,
            method: 'PUT',
            data: data
        }).done(function() {
            window.location.href = '/userjournal';
        });
    });

    $('.delete-btn').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');

        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function() {
            window.location.href = '/userjournal';
        });
    });


    $("#alerts").fadeTo(1500, 500).slideUp(500, function() {
        $("alerts").slideUp(500);
    });
});
