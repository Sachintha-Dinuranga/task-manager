// import express from "express";
// import passport from "passport";

// const router = express.Router();

// // Redirect to Google for login
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// // Google callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("http://localhost:5173/dashboard");
//   }
// );

// // Logout
// router.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.redirect("http://localhost:5173/");
//   });
// });

// // Profile (test only)
// router.get("/profile", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// });

// export default router;

import express from "express";
import passport from "passport";

const router = express.Router();

// Redirect to Google for login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

// Logout
router.post("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error logging out", error: err.message });
      }
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          return res
            .status(500)
            .json({
              message: "Error destroying session",
              error: sessionErr.message,
            });
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during logout", error: error.message });
  }
});

// Profile (protected route)
router.get("/profile", (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({
      user: req.user,
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Auth status check
router.get("/status", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

export default router;
