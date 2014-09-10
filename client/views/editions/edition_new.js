AutoForm.hooks({
  newEditionForm: {
    onSubmit: function(insertEdition, updateEdition, currentEdition) {
      console.log(insertEdition);
      console.log(currentEdition);
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", or the method name.
    onSuccess: function(operation, result, template) {}
  }
});

Template.edition_new.events({
  'change .sponsorImage': function(event, template) {
    console.log(event.target.file);
    FS.Utility.eachFile(event, function(file) {
      // Images.insert(file, function (err, fileObj) {
      //   //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      // });
    });
  }
});