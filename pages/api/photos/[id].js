import { connectToDatabase } from "../../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";

export default nc().post(async (req, res, next) => {
  console.log(req.files);
  res.status(200).json({ data: "success" });
});
