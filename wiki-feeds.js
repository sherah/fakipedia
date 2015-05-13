if (Meteor.isClient) {
  Session.wantsToShare = true;
  // counter starts at 0
  Session.setDefault('counter', 0);

  Router.route('/', function () {
    this.render('mainPage');
  });

  Router.route('/search', function () {
    this.render('search');
  });

  Router.route('/feeds', function () {
    this.render('feeds');
  });


  // Template.content.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  Template.mainPage.events({
    'click #page-cover': function(event, data){
      toggleModal();
    }
  });

  Template.topBar.events({
    'click searchIcon': function () {
      //go to the menu

    }
  });

  Template.tweetAFact.helpers({
    wantsToShare: function(){
      return Session.wantsToShare;
    }
  });

  Template.bottomBar.events({
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
      console.log(Session.wantsToShare);
      Session.wantsToShare = true;

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
