const {
  PORT = 3000,
  NODE_ENV = 'production',
  JWT_SECRET = 'b33c0bf982e93300ae04b0f78ed8eea71bc385b538b18ccdc0dcd8b0c8eb0b3e',
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
};
