import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  // res.render("index", { title: "Express" });
  // console.log("123");
  res.status(200).json({
    name: "Briean",
  });
});

router.get(
  "/getUser",
  function (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      name: "Ariean",
      aage: 26,
    });
  }
);

export default router;
