// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI);

// var db = mongoose.connection;

// db.once('open', () => {
//   console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
// });


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
