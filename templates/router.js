Router.route('Home', {
  path: '/',
  onBeforeAction: function () {
    if (Meteor.userId()) {
      this.render('App');
    } else {
      this.next();
    }
  }
});

Router.route('SignUp', {
  path: '/signup',
  onBeforeAction: function () {
    if (Meteor.userId()) {
      this.render('App');
    } else {
      this.next();
    }
  }
});

Router.route('SignIn', {
  path: '/signin',
  onBeforeAction: function () {
    if (Meteor.userId()) {
      this.render('App');
    } else {
      this.next();
    }
  }
});

Router.route('App', {
  path: '/app',
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.render('SignIn');
    } else {
      this.next();
    }
  }
});
