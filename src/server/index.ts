import * as express from "express";
import * as bodyParser from "body-parser";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import * as passportJWT from "passport-jwt";

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let app = express();

// Akun Pengguna dan Sandi tidak menggunakan basisdata
var users = [
  {
    id: 1,
    akun: 'hendra',
    sandi: '1234'
  },
  {
    id: 2,
    akun: 'coba',
    sandi: 'coba'
  }
];

// Opsi jwt untuk konfigrasi secret yang mungkin nantinya
// disimpan pada variabel environment pada sistem operasi
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'sempusari'
}

// Kelola pengguna dengan passport agar bisa diakses klien
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('data "payload" diterima');
  // biasanya ini pemanggilan basisdata
  let user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

// memuat strategy pada passport
passport.use(strategy);
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// untuk ujicoba lebih mudah dengan Postman atau HTML biasa
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// API yang digunakan pada proses login yang akan
// memeriksa akun dan sandi pengguna yang valid
app.post("/api/login", function (req, res) {
  if (req.body.akun && req.body.sandi) {
    var akun = req.body.akun;
    var sandi = req.body.sandi;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, { akun: akun })];
  if (!user) {
    res.status(401).json({ message: "tidak ditemukan akun pengguna" });
  }
  if (user.sandi === req.body.sandi) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "sip", token: token });
  } else {
    res.status(401).json({ message: "kata kunci tidak sesuai" });
  }
});

// API yang hanya bisa diakses dengan proses otentikasi valid
app.get("/api/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ message: "Sukses! Anda tidak dapat melihat ini tanpa token." });
});

// API yang hanya bisa diakses dengan proses otentikasi valid
// akan ditampilkan pula secara detail informasi otentikasinya
app.get("/api/secretDebug", function (req, res, next) {
  console.log(req.get('Authorization'));
  next();
}, function (req, res) {
  res.json("ujicoba");
});

// direktori berkas statis seperti HTML, CSS dan JS
app.use(express.static(__dirname + '/public'));

// API yang merupakan ucapan halo dunia tanpa otentikasi
app.get('/api/halo', (req, res, next) => {
  res.json({
    "pesan": "Halo Dunia! Pesan ini dikirimkan oleh Server API."
  })
});

// memulai server pada port 3000
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Melayani pada port %d di mode %s.", 3000, app.settings.env);
});