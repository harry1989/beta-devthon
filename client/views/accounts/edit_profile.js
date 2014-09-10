ProfileSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  name: {
    type: String
  },
  organization: {
    type: String
  }
  // picture: {
  //   type: CollectionFS
  // }
});

// TODO AutoForm hook to update profile data

Template.edit_profile.helpers({
  profile: function() {
    if (Meteor.user()) {
      return Meteor.user().profile;
    }
  },
  isTextField: function() {
    return this.type !== 'file';
  },
  isCheckbox: function() {
    return this.type === 'checkbox';
  },
  isFileField: function() {
    return this.type === 'file';
  }
});