import { Router } from "express";
const router = Router();


router.get("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      console.log(err);
    });
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkuser", (req, res, next) => {
  if (req.session.name) {
    res.send({ name: req.session.name });
  } else {
    res.send({ name: "" });
  }
});


export default router;
