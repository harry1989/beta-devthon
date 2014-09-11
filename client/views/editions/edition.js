Template.edition_metropolis.events({
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

Template.edition_metropolis.helpers({
	announced: function() {
		return true;
	}
});

Template.edition_bits.helpers({
	announced: function() {
		return false;
	}
});

Template.edition_eflu.helpers({
	announced: function() {
		return false;
	}
});