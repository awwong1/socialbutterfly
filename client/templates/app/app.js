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
  }
});