import express from "express";
//
import visitor from "./visitor";

const router = express.Router();

/* GET index page. */
router.get("/", (req, res) => {
  res.json({
    title: "Express"
  });
});

//router.use(response.setHeadersForCORS);

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

router.use("/visitor", visitor);


export default router;