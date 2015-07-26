Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Template.App.rendered = function () {

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
      Messages.insert({
        username: Meteor.user().username,
        text: text,
        createdAt: new Date() // current time
      });

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