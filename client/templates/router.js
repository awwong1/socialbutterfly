Router.route('/', function () {
  this.render('Home');
});

Router.route('/signup', function () {
  this.render('SignUp');
});

Router.route('/signin', function () {
  this.render('SignIn');
});