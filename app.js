const express = require( "express" );
const mongoose = require( "mongoose" );
const path = require( "path" );
const routes = require( "./routes" );
const cookieParser = require( "cookie-parser" );
const cookieSession = require( "cookie-session")
const app = express();

require( "./user" );

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/datathree", { autoIndex: false, useNewUrlParser: true });
const db = mongoose.connection;

app.set( "view engine", "pug" );
app.set( "views", "views" );
app.use( cookieSession({ secret: "session" }));
app.use( express.urlencoded({ extended: true }));
app.use( cookieParser() );
app.use( "/", routes);
app.use( "/public", express.static(process.cwd() + "/public"));

app.listen( 3000, () => console.log( "Listening on port 3000 ..." ));
