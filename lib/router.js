Meteor.startup(function(){
  Accounts.config({
    forbidClientAccountCreation : true
  });
});

Router.configure({
  layoutTemplate: 'layout'
});

Router._filters = {

  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  },

  isLoggedIn: function(pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      toastr.error('Please log in first.');
      this.render('login_page');
      pause();
    }
  },

  isLoggedOut: function(pause) {
    if(Meteor.user()){
      toastr.error("You are already logged in");
      Router.go('/');
    }
  },

  isAdmin: function(pause) {
    if(!this.ready()) return;
    if(!isAdmin()){
      toastr.error("Sorry, that's no where!");
      Router.go('/');
      pause();
    }
  }

};

var filters = Router._filters;
var coreSubscriptions = new SubsManager({
  // cache recent 50 subscriptions
  cacheLimit: 50,
  // expire any subscription after 30 minutes
  expireIn: 30
});

if(Meteor.isClient) {

  // Load Hooks

  // Before Hooks
  Router.onBeforeAction(filters.isLoggedIn, {only: ['host', 'edit_profile', 'view_profile', 'edition_new']});
  Router.onBeforeAction(filters.isLoggedOut, {only: ['login', 'signup', 'forgot', 'reset']});
  Router.onBeforeAction(filters.isAdmin, {only: ['edition_new']});

  // After Hooks

  Router.onAfterAction(filters.resetScroll);

  // Unload Hooks

  //

}

Router.map(function() {
  this.route('index', {
    path: '/',
    template: 'index',
    waitOn: function() { return coreSubscriptions.subscribe('currentUser'); }
  }),

  this.route('edition', {
    path: '/edition',
    template: 'edition',
    waitOn: function() { return coreSubscriptions.subscribe('currentUser'); }
  }),

  this.route('login', {
    path: '/accounts/login/',
    template: 'login_page',
    waitOn: function() { return coreSubscriptions.subscribe('currentUser'); }
  }),

  this.route('signup', {
    path: '/accounts/signup/',
    template: 'signup_page'
  }),

  this.route('forgot', {
    path: '/accounts/forgot/',
    template: 'forgot_page'
  }),

  this.route('logout', {
    path: '/accounts/logout',
    action: function() {
      Meteor.logout();
      Router.go(redirect());
    }
  }),

  this.route('reset', {
    path: '/reset-password/:token',
    template: 'forgot_page',
    onBeforeAction: function() {
      Session.set('resetPassword', this.params.token);
      console.log(Accounts._resetPasswordToken);
      Router.go('/accounts/forgot');
    } 
  }),

  this.route('host', {
    path: '/edition/host-your-edition',
    template: 'host'
  }),

  this.route('edit_profile', {
    path: '/accounts/profile/edit',
    template: 'edit_profile',
    layoutTemplate: 'profile_layout',
    data: function() {
      return Meteor.user();
    },
    onBeforeAction: function() {
      Session.set('editProfile', 'active');
      Session.set('viewProfile', '');
    } 
  }),

  this.route('view_profile', {
    path: '/accounts/profile',
    template: 'view_profile',
    layoutTemplate: 'profile_layout',
    data: function() {
      return Meteor.user();
    },
    onBeforeAction: function() {
      Session.set('editProfile', '');
      Session.set('viewProfile', 'active');
    }
  }),

  this.route('edition_new', {
    path: '/editions/new',
    template: 'edition_new'
  })
});