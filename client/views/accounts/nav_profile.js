Template.nav_profile.helpers({
  profile: function() {
    if (Meteor.user()) {
      return Meteor.user().profile;
    }
  },
  viewProfile: function() {
  	return Session.get('viewProfile');
  },
  editProfile: function() {
  	return Session.get('editProfile');
  }
});