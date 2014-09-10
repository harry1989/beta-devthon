Template.edition.events({
	'click button': function(e) {
		if(!Meteor.user()) {
			e.preventDefault();
			e.stopPropagation();
		}
	},
	'click a.button-register': function(e) {
		if(!Meteor.user()) {
			e.preventDefault();
			e.stopPropagation();
		}
	},
	'click a': function() {
		setRedirect();
	}
});