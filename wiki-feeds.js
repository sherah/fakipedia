if (Meteor.isClient) {

  Router.route('/', function () {
    this.render('mainPage');
  });

  Router.route('/w', function() {
    this.render('sideNav');
  });

  Router.route('/search', function () {
    this.render('search');
  });

  Router.route('/feeds', function () {
    this.render('feeds');
  });

  Router.route('wikiPage/:_name', function(){
    this.render('wikiPage', { data:
      {name: this.params._name}
    });
  });

  Router.route('/HannahHoch', function () {
    this.render('HannahHochPage');
  });

  Template.wikiPage.helpers({
    dynamicTemplate: function() {
      console.log(this);
      return Template[this.name];
    }
  });

  Template.wikiPage.events({
    'touchstart .page-cover': function(event, data){
      toggleModal('#tweetAFact');
    }
  });

  Template.search.events({
    'touchstart .goBack': function(event){
      window.history.back();
    }
  });

  Template.sideNav.events({
    'touchstart .goBack': function(event){
      event.preventDefault();
      window.history.back();
    }
  });

  Template.shortTopBar.events({
    'touchstart .xOut': function(event){
      window.history.back();
    },
  });

  Template.bottomBar.events({
    'touchstart .goBack': function(){
      window.history.back();
    },
    'touchstart .goForward': function(){
      window.history.forward();
    },
    'touchstart .favoriteIt': function (event, template) {
      $(event.target).removeClass('fa-heart-o favoriteIt')
        .addClass('fa-heart red unfavoriteIt pulse');

      $('#savedFavorite').removeClass('hide');
      setTimeout(function(){
          $('#savedFavorite').addClass('hide');
      }, 2000);
    },
    'touchstart .unfavoriteIt': function (event, template) {
      $(event.target).removeClass('fa-heart red unfavoriteIt')
        .addClass('fa-heart-o favoriteIt pulse');
    },
    'touchstart .shareIt': function (event, template) {
      toggleModal('#tweetAFact');
    },
    'touchstart .page-cover': function(event, data){
      toggleModal('#tweetAFact');
    }
  });

  var toggleModal = function( modal ){
    if( $( modal ).hasClass('hide') ){
      $(".page-cover").css("opacity",0.6).fadeIn(400, function () {
          $( modal ).removeClass('hide').css({'position':'aboslute','z-index':9999});
      });
    } else {
      $(".page-cover").css({"opacity":0, "z-index": -9999}).fadeIn(400, function () {
          $( '.modal' ).addClass('hide');
      });
    }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
