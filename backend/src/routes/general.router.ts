import { Router } from "express";
import { Cookie } from "express-session";
const router = Router();


router.get("/logout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('logout', req.session);
        res.clearCookie('myCookie');
        return res.status(200).send({ success: true });
      }
    })
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkuser", (req, res, next) => {
  // console.log("==========================================");
  
  
  // console.log('ПЕtttttttрвый лог', typeof req.session.user);
  if (req?.session?.user?.name) {
    // console.log('Второй лог', req.session.user.name);
    res.json({ name: req.session.user.name });
  } else {
    // console.log('Третий лог', req.session);
    res.json({ name: "" });
  }
});


export default router;
