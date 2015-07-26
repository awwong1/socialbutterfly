if (Meteor.isClient) {
  Template.SignUp.rendered = function () {
    $('#signup_form').form({
      rules: {
        usernameTaken: function (value) {
          return !Meteor.users.findOne({username: value});
        }
      },
      fields: {
        username: {
          identifier: 'username',
          rules: [
            {type: 'usernameTaken', prompt: 'Username already exists'},
            {type: 'empty', prompt: 'Please enter a username'},
            {type: 'length[3]', prompt: 'Your username must be 3 characters or greater'},
            {type: 'maxLength[50]', prompt: 'Your username must be at less than 50 characters'}
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {type: 'empty', prompt: 'Please enter a password'},
            {type: 'length[6]', prompt: 'Your password must be 6 characters or greater'}
          ]
        },
        password2: {
          identifier: 'password2',
          rules: [
            {type: 'empty', prompt: 'Please confirm your password'},
            {type: 'match[password]', prompt: 'Your passwords do not match'}
          ]
        }
      }
    });
  };

  Template.SignUp.events({
    'submit #signup_form': function (event) {
      event.preventDefault();
      Accounts.createUser({
        username: event.target.username.value,
        password: event.target.password.value
      }, function (err) {
        if (err) {
          console.log(err);
        } else {
          Router.go("/app");
        }
      });
    }
  });

  Template.SignIn.rendered = function () {
    $('#signin_form').form({
      fields: {
        username: {
          identifier: 'username',
          rules: [
            {type: 'empty', prompt: 'Please enter a username'}
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {type: 'empty', prompt: 'Please enter a password'}
          ]
        }
      }
    });
  };

  Template.SignIn.events({
    'submit #signin_form': function (event) {
      event.preventDefault();
      Meteor.loginWithPassword(
        event.target.username.value,
        event.target.password.value, function (err) {
          if (err) {
            $('#signin_form').removeClass("error").addClass("error");
            $('#signin_form').form("add errors", [err.reason]);
            console.log(err);
          } else {
            Router.go("/app");
          }
        }
      );
    }
  });
}