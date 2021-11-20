import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies;

  if (token) {
    const userData = await fetch("https://discord.com/api/users/@me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => response.json())

    res.status(200)
    return res.json(userData)
  }

  return res.status(200).json({ code: 0, message : "Not logged"})
}
