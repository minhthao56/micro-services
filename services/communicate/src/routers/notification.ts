import express, { Router } from "express";

const router: Router = express.Router();
router.get("/", (req, res) => {
  res.json({
    message: "Hi",
  });
});

router.use("/api/v1", function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
});

export default router;