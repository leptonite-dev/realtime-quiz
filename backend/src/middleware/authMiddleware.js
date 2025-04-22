import jwt from 'jsonwebtoken'

export const authorize = (roles) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      jwt.verify(token, "whoknows", (error, decoded) => {
        if (error) throw error;

        if (roles.includes(decoded.role)) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(501).json({ message: error.message });
    }
  };
};
