const router = require("express")();
const passport = require("passport");

router.get("/", (req, res) => {
  res.send('<button><a href="/google/login">Login with google</a></button>');
});

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/google/success",
    failureRedirect: "/google/failed",
  })
);

router.get("/failed", (req, res) => {
  res.send({ status: false, message: "Wrong Google credentials" });
});

router.get("/success", (req, res) => {
  if (!req.user) {
    res.redirect("/google/failed");
  } else {
    const userData = req.user.name.givenName;
    const htmlRes = `<h1>Welcome</h1><h3>${userData}</h3>`;
    res.send(htmlRes);
  }
});


module.exports = router;
