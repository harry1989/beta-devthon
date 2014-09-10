Template.nav.helpers({
	displayName: function() {
		var user = Meteor.user();
		return Meteor.user() ? user.profile.name : "Log in";
	},
	displayLink: function() {
		var user = Meteor.user();
		return Meteor.user() ? "/accounts/profile" : "/accounts/login";
	},
	displayImage: function() {
		var user = Meteor.user();
		return Meteor.user() ? user.profile.picture : "";
	}
});

Template.nav.events({
	'click a': function() {
		setRedirect();
	}
});