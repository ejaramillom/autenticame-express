const mongoose = require( "mongoose" );
const User = require( "./user" );
const express = require( "express" );
const router = express.Router();
const requireUser = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    res.locals.user = user;
    next();
  } else {
    return res.redirect("/login");
  }
}

// UserSchema.statics.authenticate = async ( email, password ) => {
//   // buscamos el usuario utilizando el email
//   const user = await mongoose.model( "User" ).findOne({ email: email });
//
//   if ( user ) {
//     // si existe comparamos la contraseña
//     return new Promise(( resolve, reject ) => {
//       bcrypt.compare( password, user.password, ( err, result ) => {
//         if ( err ) reject( err );
//         resolve( result === true ? user : null );
//       });
//     });
//     return user;
//   }
//
//   return null;
// };

router.get( "/", requireUser, async ( req, res ) => {
  const users = await User.find();
  res.render( "index", { users: users });
});

router.get( "/register", ( req, res ) => {
  res.render( "new" );
});

router.post( "/register", async ( req, res ) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const user = await User.create( data );
  } catch ( e ) {
    console.error( e );
  }
  res.redirect( "/" );
});

router.get( "/login", ( req, res ) => {
  res.render( "login" );
});

router.post("/login", async function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.authenticate(email, password);
    if (user) {
      req.session.userId = user._id; // acá guardamos el id en la sesión
      return res.redirect("/");
    } else {
      res.render("/login", { error: "Wrong email or password. Try again!" });
    }
  } catch (e) {
    return next(e);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
