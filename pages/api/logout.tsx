import type { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    })
  );
  return res.status(200).json({ message : "Token deleted successfully" });
};
