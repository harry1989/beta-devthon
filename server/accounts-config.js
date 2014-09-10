// Rename this file to accounts.js

ServiceConfiguration.configurations.remove({
  service: "facebook"
});
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "",
  secret: ""
});

ServiceConfiguration.configurations.remove({
  service: "twitter"
});
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "",
  secret: ""
});
