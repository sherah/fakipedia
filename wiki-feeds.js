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
    'click #page-cover': function(event, data){
      toggleModal();
    }
  });

  Template.search.events({
    'click .goBack': function(){
      window.history.back();
    }
  });

  Template.bottomBar.events({
    'click .goBack': function(){
      window.history.back();
    },
    'click .goForward': function(){
      window.history.forward();
    },
    'click .favoriteIt': function (event, template) {
      $(event.target).removeClass('fa-heart-o favoriteIt')
        .addClass('fa-heart red unfavoriteIt pulse');

      $('#savedFavorite').removeClass('hide');
      setTimeout(function(){
          $('#savedFavorite').addClass('hide');
      }, 2000);
    },
    'click .unfavoriteIt': function (event, template) {
      $(event.target).removeClass('fa-heart red unfavoriteIt')
        .addClass('fa-heart-o favoriteIt pulse');
    },
    'click .shareIt': function (event, template) {
      toggleModal('#tweetAFact');
    }
  });

  var toggleModal = function( modal ){
    if( $( modal ).hasClass('hide') ){
      $("#page-cover").css("opacity",0.6).fadeIn(300, function () {
          $( modal ).removeClass('hide').css({'position':'aboslute','z-index':9999});
      });
    } else {
      $("#page-cover").css("opacity",0).fadeIn(300, function () {
          $( '.modal' ).addClass('hide').css({'position':'relative','z-index':0});
      });
    }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
