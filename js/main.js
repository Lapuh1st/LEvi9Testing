;(function (document, $) {
    'use strict';

    var githubToken = '?access_token=3bceb316f870c6df7bca05a75a9c643822b18258',
        githubAPI = 'https://api.github.com/users' +githubToken;

    var GetListfUsers = function () {
        $.when($.ajax(githubAPI)).then(function (data) {
            $('#userList').tmpl(data).appendTo('#main');
        });
    };

    var uploadMoreInfo = function (event) {
        event.preventDefault();

        var $button = $(this),
            userLogin = $button.data('user-login'),
            userLink =  'https://api.github.com/users/' + userLogin + githubToken,
            $userInfoContainer = $button
                .closest('.user-info')
                .siblings('.user-more-info'),
            $userInfoItem = $userInfoContainer.find('.user-moreInfoItem').length;

        if($userInfoItem) {
            return;
        }

        $.when($.ajax(userLink)).then(function (data) {
            $('#userMoreInfo').tmpl(data).appendTo($userInfoContainer);
            $userInfoContainer.find('.user-preloader').remove();
        });

    };

    var init = function () {

        GetListfUsers();

        $(document).on('click', '.js-more-button', uploadMoreInfo);
    };

    init();

}(document, jQuery));