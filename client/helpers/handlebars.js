// ** Handlebars helpers **

UI.registerHelper('isAdmin', function(showError) {
  if(isAdmin(Meteor.user())){
    return true;
  }else{
    Router.go('/');
  }
});

UI.registerHelper('hasImage', function(showError) {
  if(hasImage(Meteor.user()))
    return true;
  else
  	return false;
});