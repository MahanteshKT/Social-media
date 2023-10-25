import jwt from "jsonwebtoken";

export const VerifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status("403").json({ error: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
      const verified = jwt.verify(token, process.env.SECRET);
      if (!verified) {
        res.status(400).json({ error: "error" });
      }
      req.user = verified;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//put verfiyToken Middleware function in between the startpoint and endpoint o
