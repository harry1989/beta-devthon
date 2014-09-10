Accounts.onCreateUser(function(options, user) {
	var userProperties = {
		profile: options.profile || {},
		karma: 0,
		isAdmin: false,
		isCurator: false,
		commentCount: 0
	};
	user = _.extend(user, userProperties);
	if (user.services.facebook) {
		options.profile.email = user.services.facebook.email;
		options.profile.name = user.services.facebook.name;
	}

	if (options.email)
	    user.profile.email = options.email;

    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }

    // if this is the first user ever, make them an admin
    if (!Meteor.users.find().count())
    	user.isAdmin = true;

    return user;
});