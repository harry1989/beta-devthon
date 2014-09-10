STATUS_DRAFT=0;
STATUS_CONFIRM=1;

var Schemas = {};

SimpleSchema.messages(
  { expectedDate: "Please choose a date from the calendar" }
);

Editions = new Meteor.Collection('editions');

// title
// image
// description
// location
// date
// TODO time
// curator - name, website, twitter, facebook
// offical sponsors
// edition sponsors

Schemas.Editions = new SimpleSchema({
  title: {
    type: String,
    label: "Edition Title",
  },
  image: {
    type: String,
    label: "Link to the header image",
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  date: {
    type: Date,
    label: "Date",
    custom: function() {
      if(moment(this.value).format() === "Invalid date") {
        return "expectedDate";
      }
    }
  },
  description: {
    type: String,
    label: "Description"
  },
  location: {
    type: String,
    label: "Location",
  },
  sponsors: {
    type: Array,
    optional: true,
    minCount: 0,
    maxCount: 5
  },
  'sponsors.$': {
    type: Object,
    label: "Sponsor"
  },
  'curator.$': {
    type: Object,
    label: "Curator"
  },
  'curator.$.name': {
    type: String,
    max: 50
  },
  'curator.$.website': {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  'curator.$.twitter': {
    type: String,
    max: 20,
  },
  'curator.$.facebook': {
    type: String,
    max: 20,
  }
});

Editions.attachSchema(Schemas.Editions);

Editions.deny({
  update: function(userId, edition, fieldNames) {
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 
      'title',
      'description',
      'date',
      'location',
      'curator').length > 0);
  }
});

Meteor.methods({
  post: function(edition){
     var title = edition.title,
        image = edition.image,
        date = edition.date,
        description = edition.description,
        location = edition.location,
        sponsors = edition.sponsors,
        curator = edition.curator,
        user = Meteor.user(),
        userId = user._id,
        submitted = parseInt(edition.submitted) || moment().format(),
        status = STATUS_DRAFT;
        
    // check that user is logged in
    if (!isAdmin(user))
      throw new Meteor.Error(601, 'You are not allowed to post a new edition.');

    // check that user provided a title
    if(!edition.title)
      throw new Meteor.Error(602, 'Please fill in the edition title');

    edition = _.extend(edition, {
      createdAt: moment().format(),
    });

    editionId = Editions.insert(edition);

    // increment editions count
    Meteor.users.update({_id: userId}, {$inc: {editionCount: 1}});

    edition = _.extend(edition, {_id: editionId});

    // add the edition's own ID to the edition object and return it to the client
    edition.editionId = editionId;
    return edition;
  },

  edition_edit: function(edition){
    // TODO: make edition_edit server-side?
  },

});