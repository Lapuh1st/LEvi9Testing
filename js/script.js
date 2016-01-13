var dataProvider = function () {
    'use strict';

    var model = "2";

    var githubAPI = "https://api.github.com/users?access_token=3bceb316f870c6df7bca05a75a9c643822b18258";

    var setModelData = function (data) {
        model = data;
    };

    var httpService = {};

    var jqxhr = $.getJSON(githubAPI, function() {
        console.log( "success" );
    }).done(function() {
        model = jqxhr;
        console.log(model);
    }).fail(function() {
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
    });

    //$.getJSON(githubAPI, function (data, model) {
    //
    //    console.log(model);
    //    model = 5;
    //
    //    var items = [];
    //
    //    $.each( data, function (key, val) {
    //
    //        val.site_admin = val.site_admin ? "Admin of github" : "";
    //
    //        items.push( "<li class='user-item'> <div class='user-container' id='" + key + "'>" +
    //            "<img src='" + val.avatar_url + "' class='user-avatar user-container--item'/>" +
    //            "<div class='user-login user-container--item'>Login: " + val.login + "</div>" +
    //            "<div class='user-admin user-container--item'>" + val.site_admin + "</div>" +
    //            "<a href='https://api.github.com/users/" +
    //            val.login +
    //            "' class='user-more js-more-button btn btn-primary user-container--item' data-toggle='collapse' data-target='#collapseExample" + key + "'> More Information <i class='glyphicon glyphicon-plus'></i></i></a></div>" +
    //            "<div class='user-moreContainer' class='collapse' id='collapseExample" + key + "'></div>" +
    //            "</li>" );
    //    });
    //
    //    $( "<ul/>", {
    //        "class": "user-list",
    //        html: items.join("")
    //    }).appendTo("body");
    //}).fail(function () {
    //    alert('Json is empty');
    //});


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

    return model;
};

dataProvider();