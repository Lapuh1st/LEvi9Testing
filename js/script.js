;(function ($, document) {
    'use strict';

    $.getJSON( "https://api.github.com/users", function (data) {
        var items = [];

        $.each( data, function (key, val) {

            if(val.site_admin){
                val.site_admin = "Admin of github";
            } else {
                val.site_admin = "";
            }

            items.push( "<li class='user-item'> <div class='user-container' id='" + key + "'>" +
                "<img src='" + val.avatar_url + "' class='user-avatar user-container--item'/>" +
                "<div class='user-login user-container--item'>Login: " + val.login + "</div>" +
                "<div class='user-admin user-container--item'>" + val.site_admin + "</div>" +
                "<a href='https://api.github.com/users/" +
                val.login +
                "' class='user-more js-more-button btn btn-primary user-container--item' data-toggle='collapse' data-target='#collapseExample" + key + "'> More Information <i class='glyphicon glyphicon-plus'></i></i></a></div>" +
                "<div class='user-moreContainer' class='collapse' id='collapseExample" + key + "'></div>" +
                "</li>" );
        });

        $( "<ul/>", {
            "class": "user-list",
            html: items.join("")
        }).appendTo("body");
    }).fail(function () {
        alert('Json is empty');
    });


    var uploadMoreInfo = function (event) {
        event.preventDefault();

        var $button = $(this),
            userLink = $button.attr('href'),
            moreInfoContainer = $button.closest('.user-container').siblings('.user-moreContainer'),
            infoList = moreInfoContainer.find('.more-info-test');

        if(infoList.length) {
            return;
        }

        $.getJSON( userLink , function ( data ) {
            var items = [];

            items.push(
                "<li class='user-data-followers user-container--item'>Followers: " + data.followers + "</li>" +
                "<li class='user-data-following user-container--item'>Following: " + data.following + "</li>");

            $( "<ul/>", {
                "class": "more-info-test",
                html: items.join( "" )
            }).appendTo(moreInfoContainer);

        }).fail(function () {
            alert('Json is empty');
        });
    }

    $(document).on('click', '.js-more-button', uploadMoreInfo);

}(jQuery, document));