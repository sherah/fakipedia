if (Meteor.isClient) {

  Session.set({
    backPage: '/'
  });

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

  Template.mainPage.events({
    'touchstart a': function(event, data){
      var t         = data.view.name,
          template  = t.substr(t.indexOf('.')+1);

      Session.set('backPage', template);
      console.log('the backpage: ', Session.get('backPage'));
    },
    'touchstart .goBack': function(event, data){
      event.preventDefault();
      goToLastPage(Session.get('backPage'));
    }
  });

  var goToLastPage = function(lastPage){
      Blaze.render(lastPage, document.body);
  };

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

  Template.sideNav.events({
    'touchstart .contributeBtn': function(event){
      event.preventDefault();
      $('.ThankYou').css({'display':'block','z-index': '9999'});
    },
    'touchstart .goBack': function(event){
      event.preventDefault();
      console.log(Session.get('backPage'));
      goToLastPage(Session.get('backPage'));
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
    'touchstart .goBack': function(event){
      window.history.back();
    },
  });

  Template.bottomBar.events({
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
