import type { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;

  if (state.toString() != req.cookies.state) {
    return res.status(400).json({ message: "Invalid state" });
  }

  if (!code) {
    return res.redirect("/");
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
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", getToken.access_token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: getToken.expires_in,
      })
    );
    return res.redirect("/");
  }

  return res.status(400).json({ message: "Token not found" });
};
