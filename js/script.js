var dataProvider = function () {
    'use strict';

    var githubAPI = "https://api.github.com/users?access_token=3bceb316f870c6df7bca05a75a9c643822b18258";

    var GetListfUsers = function () {
        $.getJSON(githubAPI, function (json) {
        }).done(function(json) {
            console.log("second success");
            $('#userList').tmpl(json).appendTo('#main');
        }).fail(function() {
            console.log( "error" );
        }).always(function() {
            console.log( "complete" );
        });
    };

    var uploadMoreInfo = function (event) {
        event.preventDefault();

        var $button = $(this),
            userLogin = $button.data('user-login'),
            userLink =  "https://api.github.com/users/" + userLogin,
            $userMoreInfoContainer = $button
                .closest('.user-info')
                .siblings('.user-more-info');

        if($userMoreInfoContainer.has('.user-moreInfoItem').length) {
            return;
        }

        $.getJSON(userLink, function (json) {
        }).done(function(json) {
            $('#userMoreInfo').tmpl(json).appendTo($userMoreInfoContainer);
            $userMoreInfoContainer.find('.user-preloader').remove();
        }).fail(function() {
            console.log( "error" );
        }).always(function() {
            console.log( "complete" );
        });
    };

    var init = function () {

        GetListfUsers();

        $(document).on('click', '.js-more-button', uploadMoreInfo);
    };

    init();

};

dataProvider();