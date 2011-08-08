(function () {
    var Model = new function () {
        this.init = function () { };

        this.Login = function (username, password, callback) {
            ZinOS.AsyncHTTPRequest('/Home/Login/',
                    'POST',
                    { username: username, password: password },
                    function (message) {
                        callback(message.MessageData);
                    });
        };

        this.Logout = function (callback) {
            ZinOS.AsyncHTTPRequest('/Home/Logout/',
                'POST',
                undefined,
                function (message) {
                    callback(message.MessageData);
                });
        };
    } ();

    var View = new function () {
        this.init = function (fnReady) {
            $(document).ready(function () {
                fnReady();
            });
        };

        this.OnClickLoginButton = function (eventHandler) {
            var loginBtn = $("#login-control > .login-button");

            loginBtn.click(function () {
                var username = $("#login-control > input[type=text]").val();
                var password = $("#login-control > input[type=password]").val();
                eventHandler(username, password);
            });
        };

        this.OnClickLogoutButton = function (eventHandler) {
            var logoutbuttonBtn = $("#login-control > .logout-button");
            logoutbuttonBtn.click(function () {
                eventHandler();
            });
        };

        this.LoggedIn = function () {
            ZinOS.RedirectToPage('/Dashboard/');
        };

        this.LoggedOut = function () {
            ZinOS.RedirectToPage('/');
        };

        this.LoginError = function () {
            alert('error');
        };
    } ();

    var Controller = new function () {
        var init = this.init = function () {
            Model.init();
            View.init(function () {
                View.OnClickLoginButton(onClickLoginButton);
                View.OnClickLogoutButton(onClickLogoutButton);
            });
        };

        var onClickLoginButton = function (username, password) {
            Model.Login(username, password, function (success) {
                if (success) {
                    View.LoggedIn();
                } else {
                    View.LoginError();
                }
            });
        };

        var onClickLogoutButton = function () {
            Model.Logout(function (success) {
                if (success) {
                    View.LoggedOut();
                } else {
                    View.LoginError();
                }
            });
        };
    } ();

    Controller.init();
})();