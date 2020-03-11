const mongoose = require( "mongoose" );
const bcrypt = require( "bcrypt" );
const UserSchema = require( "./userSchema" );

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/auth-test-dev", { autoIndex: false, useNewUrlParser: true });
const db = mongoose.connection;

const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// hashes the password
schema.pre( "save", function ( next ) {
  bcrypt.hash( this.password, 10, ( err, hash ) => {
    if ( err ) {
      return next( err );
    }
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model( "User", schema );
module.exports = mongoose.model("User", UserSchema);
