ApplySchema = new SimpleSchema({
	name: {
		type: String,
        max: 50
	},
	location: {
		type: String,
        max: 50,
        label: 'Where would you like to host your edition?'
	},
	profession: {
		type: String,
        max: 50,
        label: 'What do you do?'
	},
	about : {
		type: String,
        max: 150,
        label: "Tell us about yourself"
	},
	intent: {
		type: String,
        max: 300,
        label: "What motivated you to host Devthons?"
	},
	info: {
		type: String,
		max: 100,
		label: 'Would you like to share anything else with us?'
	}
});