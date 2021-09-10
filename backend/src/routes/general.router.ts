import { Router } from "express";
import { Cookie } from "express-session";
import { idText } from "typescript";
import masterModel from "../db/models/master.model";
import userModel from "../db/models/user.model";
const router = Router();

router.get("/logout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('myCookie');
        return res.status(200).send({ success: true });
      }
    })
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkuser", async (req, res, next) => {
  if (req?.session?.user) {
    const id = req?.session?.user?.id
    const userID = await userModel.findOne({ _id: id });
    const masterID = await masterModel.findOne({ _id: id })
    if (userID) {
      // console.log('Сессия юзера существует');
      res.json({
        name: req.session.user.name,
        userID: req.session.user.id,
        role: 'user'
      });
    }
    if (masterID) {
      // console.log('Сессия мастера существует');
      res.json({
        name: req.session.user.name,
        masterID: req.session.user.id,
        role: 'master'
      });
    }
  } else {
    // console.log('Сессия не существует');
    res.json({
      name: '',
      id: '',
      role: ''
    });
  }
});


export default router;
