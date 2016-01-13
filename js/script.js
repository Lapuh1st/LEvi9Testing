var dataProvider = function () {
    'use strict';

    var githubAPI = "https://api.github.com/users?access_token=3bceb316f870c6df7bca05a75a9c643822b18258";

    $.getJSON(githubAPI, function (data) {
    }).done(function(data) {
        console.log("second success");
        $('#userList').tmpl(data).appendTo('#main');
    }).fail(function() {
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
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

};

dataProvider();