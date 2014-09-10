Template.listing.helpers({
	columns: function() {
		var total = 3;
		var grid = 12;
		var columns = grid/total;
		return columns < 4 ? 4 : columns;
	}
})