define(function(require){
    var User = require("models/user");
    var Dashboard = require("views/dashboard");
    var view = Backbone.View.extend({
        initialize: function(){

        },

        events : {
            "click #createAccount" : "onCreateAccountClick",
            "click #signInLink" : "onSignInClick",
            "click #registerBtn" : "onRegisterBtnClick",
            "click #loginBtn" : "onLoginBtnClick"
        },
        onSignInClick: function(){
            $("#signInContainer").removeClass("hide");
            $("#register").addClass("hide");
        },
        onCreateAccountClick: function(){
            $("#signInContainer").addClass("hide");
            $("#register").removeClass("hide");
        },
        onRegisterBtnClick: function(){
            if (this.validateRegistrationData()){
                var user = new User();
                user.save({
                        "emailId" : $("#registerEmailId").val(),
                        "password" : $("#newPassword").val()
                    },
                    {
                    success : function(obj,resp){
                        console.log(resp);
                    },
                    error : function(object, response){
                        console.log(response);
                    }
                });
            }

        },
        onLoginBtnClick: function(){
            if(this.validateLoginData()){
                var user = new User({
                    "emailId" : $("#inputEmail").val(),
                    "password" : $("#inputPassword").val()
                });

                user.signIn(function(response){
                    if(response.login){
                        //show dashboard
                        var dashboard = new Dashboard();
                        dashboard.setup();
                    }
                });
            }
        },
        validateLoginData: function(){
            var emailId = $("#inputEmail");
            if (emailId.val() == "")
                return false;
            var password = this.$("#inputPassword");
            if (password.val() == "")
                return false;
            return true;
        },
        validateRegistrationData : function(){
            var emailId = $("#registerEmailId");
            if (emailId.val() == "")
                return false;
            return this.validatePassword();
        },
        validatePassword : function(){
            var password = this.$("#newPassword")[0];
            var confirmPassword = this.$("#confirmPassword")[0];
            if(password.value != confirmPassword.value) {
                confirmPassword.setCustomValidity("Passwords Don't Match");
                return false;
            } else {
                confirmPassword.setCustomValidity('');
                return true;
            }
        }
    });

    return view;
});