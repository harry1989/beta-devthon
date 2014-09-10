Template.login_page.rendered = function() {
	if(Meteor.userId())
		Router.go('/');
}

Template.forgot_page.rendered = function() {
	if (Accounts._resetPasswordToken) {
		Session.set('resetPassword', Accounts._resetPasswordToken);
	} 
}

SimpleSchema.messages({
  "passwordMismatch": "Passwords do not match",
  "invalidEmailorPassword": "Invalid email or password",
  required: "You missed filling this out"
});

LoginSchema = new SimpleSchema({
	email: {
		type: String,
        regEx: SimpleSchema.RegEx.Email
	},
	password: {
		type: String,
		min: 8
	}
});

RegisterSchema = new SimpleSchema({
	name: {
		type: String
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	},
	password: {
		type: String,
		label: "Password",
		min: 8
	},
	confirmPassword: {
		type: String,
		label: "Confirm Password",
		min: 8,
		custom: function () {
		  if (this.value !== this.field('password').value) {
		    return "passwordMismatch";
		  }
		}
	}
});

ForgotPasswordSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	}
});

ResetPasswordSchema = new SimpleSchema({
	password: {
		type: String,
		label: "Password",
		min: 8
	},
	confirmPassword: {
		type: String,
		label: "Confirm Password",
		min: 8,
		custom: function () {
		  if (this.value !== this.field('password').value) {
		    return "passwordMismatch";
		  }
		}
	}
});

AutoForm.hooks({
	loginForm: {
		onSubmit: function(creds) {
        	Meteor.loginWithPassword(creds.email, creds.password, function(err){
        		if (!err && Router.current().path === "/accounts/login") {
        			Router.go("/");
        		}

        		if(err && err.error === 403) {
        			toastr.error("Invalid username or password");
        			return false;
        		}
        	});
			this.resetForm();
			this.done();
        	return false;
		}
	},
	registerForm: {
		onSubmit: function(creds) {
	        Meteor.call('createProfile', creds, function(err, res) {
	        	if(err) {
		        	if (err.error === 500) {
		        		toastr.error("Oh snap! We're really sorry something went wrong.");
		        		return false;
		        	} else if (err.error === 601) {
		        		toastr.error(err.reason);
		        		return false;
		        	}
	        	}
	        });
        	Router.go('/');
			this.resetForm();
			this.done();
	        toastr.success("You've signed up successfully!");
        	return false;
		}
	},
	passwordForm: {
		onSubmit: function(form) {
			Accounts.forgotPassword({email: form.email}, function(err){
			  if (err) {
			    toastr.error("Doh! Password reset failed. Please try again.");
			    return false;
			  } else {
			  	toastr.success("Please check email instructions for password reset");
				return false;
			  }
			});
			this.resetForm();
			this.done();
			return false;
		}
	},
	passwordResetForm: {
		onSubmit: function(form) {
			Accounts.resetPassword(Session.get('resetPassword'), form.password, function(err) {
                if (err) {
                    toastr.error("We\'re sorry but something went wrong. Please request password reset again.");
                    Session.set('resetPassword', null);
                    Router.go('/');
                    return false;
                }
                else {
                    toastr.success('Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                }
            });
            this.done();
            this.resetForm();
            Router.go('/');
            return false;
		}
	}
});

Template.login_form.events({
	'submit #login-form' : function(e, t) {
		e.preventDefault();
		// retrieve the input field values
		var email = t.find('#login-email').value
		, password = t.find('#login-password').value;

		// Trim and validate your fields here.... 

		// If validation passes, supply the appropriate fields to the
		// Meteor.loginWithPassword() function.
		Meteor.loginWithPassword(email, password, function(err) {
			if (!err)
			  Router.go(redirect());
		});
	 	return false; 
	},

	'click #fb-login': function() {
		Meteor.loginWithFacebook({
				requestPermissions: ['user_friends', 'email']
		}, function (err) {
			if(err) {
				console.log(err);
				toastr.error("Unable to login using Facebook. Please try later.");
			} else {
			  Router.go(redirect());
			}
		});
	},

	// 'click #tw-login': function() {
	// 	Meteor.loginWithTwitter({

	// 	}, function(err) {
	// 		if(!err)
	// 			toastr.error("Unable to login using Twitter. Please try later.");
	// 		else
	// 			Router.go('/');
 //        });
	// }
});

Template.forgot_page.helpers({
	resetPassword: function (t) {
		return Session.get('resetPassword');
	}
});