if (Meteor.isClient) {

  Router.route('/', function () {
    this.render('mainPage');
  });

  Router.route('/featuredArticle', function () {
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
    'touchstart .page-cover, click .page-cover': function(event, data){
      toggleModal('#tweetAFact');
    }
  });

  Template.wikiPage.onRendered(function(){
    window.scroll(0,0);
  });

  Template.search.onRendered(function(){
    window.scroll(0,0);
  });

  Template.search.events({
    'touchstart .goBack, click .goBack': function(event){
      event.preventDefault();
      window.history.back();
    }
  });

  Template.shortTopBar.events({
    'touchstart .goBack, click .goBack': function(event){
      console.log('it works');
      window.history.back();
    }
  });

  Template.sideNav.events({
    'touchstart .goBack, click .goBack': function(event){
      event.preventDefault();
      window.history.back();
    },
    'touchstart .contributeBtn, click .contributeBtn': function(event){
      event.preventDefault();
      $('.ThankYou').css({'display':'block','z-index': '9999'});
    }
  });

  Template.ThankYou.events({
    'click .thankYouX': function(event){
      event.preventDefault();
      $('.ThankYou').css({'display':'none','z-index': '-9999'});
    },
  });

  Template.donateButton.events({
    'click .donateButton': function(event){
      event.preventDefault();

    },
  });

  Template.shortTopBar.events({
    'touchstart .xOut, click .xOut': function(event){
      window.history.back();
    },
  });

  Template.bottomBar.events({
    'touchstart .goback, click .goBack': function(){
      $('#mainWikiPage').addClass('bounceOutDown');
      window.history.back();
    },
    'touchstart .slideDown, click .slideDown': function(){
      window.history.back();
    },
    'touchstart .goForward, click .goForward': function(){
      window.history.forward();
    },
    'touchstart .favoriteIt, click .favoriteIt': function (event, template) {
      $(event.target).removeClass('fa-heart-o favoriteIt')
        .addClass('fa-heart red unfavoriteIt pulse');

      $('#savedFavorite').removeClass('hide');
      setTimeout(function(){
          $('#savedFavorite').addClass('hide');
      }, 2000);
    },
    'touchstart .unfavoriteIt, click .unfavoriteIt': function (event, template) {
      $(event.target).removeClass('fa-heart red unfavoriteIt')
        .addClass('fa-heart-o favoriteIt pulse');
    },
    'touchstart .shareIt, click .shareIt': function (event, template) {
      toggleModal('#tweetAFact');
    },
    'touchstart .page-cover, click .page-cover': function(event, data){
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
