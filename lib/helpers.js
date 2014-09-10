redirect = function() {
	var page = Session.get('currentPage');
	Session.set('currentPage', '/');
	return page;
}

setRedirect = function() {
	Session.set('currentPage', Router.current().path);
}