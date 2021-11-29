import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const encryptedToken = req.cookies.token;

  if (encryptedToken) {
    const token = JSON.parse(CryptoJS.AES.decrypt(encryptedToken, process.env.TOKEN_HASH).toString(CryptoJS.enc.Utf8)).getToken;
    const userData = await fetch("https://discord.com/api/users/@me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token.access_token}`
      }
    }).then(response => response.json())

    return res.status(200).json(userData)
  }

  return res.json({ code: 401, message: "Token not found" });
}
