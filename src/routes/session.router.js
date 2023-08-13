import { Router } from "express";
import UserModel from "../Dao/models/user.model.js"

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) return res.redirect("login");

  req.session.user = user;

  return res.redirect("/profile");
});

router.post("/register", async (req, res) => {
  const user = req.body;

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    user.rol = "admin";
  }
  await UserModel.create(user);

  return res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: err });
    }
    res.redirect("/");
  });
});

export default router;
