Messages = new Mongo.Collection("messages");

Meteor.methods({
  addMessage: function (text) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});

if (Meteor.isClient) {
  Template.App.rendered = function () {
    $('.new-message').form({
      fields: {
        text: {
          identifier: 'text',
          rules: [
            {type: 'empty', prompt: 'Please enter some text'},
            {type: 'maxLength[255]', prompt: 'Your text must be less than 255 characters'}
          ]
        }
      }
    });
    // fix main menu to page on passing
    $('.main.menu').visibility({
      type: 'fixed'
    });
    // show dropdown on hover
    $('.main.menu  .ui.dropdown').dropdown({
      on: 'hover'
    });
    $("body").removeClass("pushable");
  };

  Template.App.events({
    'click #signout_button': function (event) {
      event.preventDefault();
      Meteor.logout();
      Router.go("/");
    },
    "submit .new-message": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Meteor.call("addMessage", text);

      // Clear form
      event.target.text.value = "";
    }
  });

  Template.App.helpers({
    messages: function () {
      return Messages.find({}, {sort: {createdAt: -1}, limit: 50});
    }
  });
}