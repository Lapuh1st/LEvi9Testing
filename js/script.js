;(function ($, document) {
    'use strict';

    //var listAllUsersGet = function () {
    //    return $.get("https://api.github.com/users");
    //};

    $.getJSON( "https://api.github.com/users", function ( data ) {
        var items = [];

        $.each( data, function (key, val) {
            items.push( "<li class='user-item' id='" + key + "'>" +
                "<div class='user-login'>" + val.login + "</div>" +
                "<div class='user-admin'>" + val.site_admin + "</div>" +
                "<img src='" + val.avatar_url + "' class='user-avatar'/>" +
                "<div href='https://api.github.com/users/" + val.login + "' class='user-more js-more-button'> More Information</div>" +
                "<div class='user-moreContainer'></div>" +
                "</li>" );
        });

        $( "<ul/>", {
            "class": "user-list",
            html: items.join( "" )
        }).appendTo( "body" );
    }).fail(function () {
        alert('Json is empty');
    });

    $(document).on('click', '.js-more-button', function (event) {
        event.preventDefault();

        var $button = $(this),
            userLink = $button.attr('href'),
            moreInfoContainer = $button.siblings('.user-moreContainer');

        console.log(moreInfoContainer);

        $.getJSON( userLink , function ( data ) {
            var items = [];

            items.push( "<li class='user-item'>" +
                "<div class='user-data-followers'>" + data.followers + "</div>" +
                "<div class='user-data-following'>" + data.following + "</div>" +
                "</li>" );

            $( "<ul/>", {
                "class": "more-info-test",
                html: items.join( "" )
            }).appendTo(moreInfoContainer);

        }).fail(function () {
            alert('Json is empty');
        });



    });


}($, document));