const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;

// Function to establish the database connection
async function connectToDatabase() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log("Connected successfully to db server");
  db = client.db("myproject");
}

// Create the user account
async function create(name, email, password) {
  await connectToDatabase();
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// Get all users
async function all() {
  await connectToDatabase();
  return new Promise((resolve, reject) => {
    const customers = db.collection("users").find({}).toArray(function (err, docs) {
      err ? reject(err) : resolve(docs);
    });
  });
}

module.exports = { create, all };
