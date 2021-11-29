import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;

  if (!code) {
    return res.redirect("/");
  }

  if (state.toString() != req.cookies.state) {
    return res.status(400).json({ message: "Invalid state" });
  }

  const getToken = await fetch(process.env.DISCORD_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-store",
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.SCOPE,
    }),
  }).then((response) => response.json());

  if (getToken.access_token) {
    const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify({ getToken }), process.env.TOKEN_HASH).toString();
    res.setHeader(
      "Set-Cookie",
      [
        cookie.serialize("state", "", {
          path: "/",
          maxAge: 0,
        }),
        cookie.serialize("token", encryptedToken, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          maxAge: getToken.expires_in,
        })
      ]
    );
    return res.redirect("/");
  }

  return res.status(400).json({ message: "Token not found" });
};
