if (Meteor.isClient) {
  Template.Home.rendered = function () {

    // fix menu when passed
    $('#primary_menu').visibility({
      once: false,
      onBottomPassed: function () {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function () {
        $('.fixed.menu').transition('fade out');
      }
    });

    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
    $("#floating_menu").remove();
  };
}