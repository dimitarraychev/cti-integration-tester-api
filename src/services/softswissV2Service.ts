import { Request, Response } from "express";
import crypto from "crypto";

let totalBalance = 123456;

export const generateHmacSha256Hex = (payload: string, psk: string): string => {
  return crypto.createHmac("sha256", psk).update(payload, "utf8").digest("hex");
};

export const generateSoftswissLaunchURL = async (
  req: Request,
  res: Response
) => {
  const { payload, apikey, psk } = req.body;
  const baseUrl = "https://rgs-stage-api.ctrgs.com:1381/softswiss-api/";
  const url = `${baseUrl}${apikey}/v2/a8r_provider.Launcher/Real`;
  const signature = generateHmacSha256Hex(payload, psk);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-REQUEST-SIGN": signature,
      },
      body: payload,
    });

    console.log("RESPONSE FROM RGS: ", response);

    if (!response.ok) {
      res.status(400).json({ message: "Internal Error" });
      return;
    }

    const data = await response.json();

    res.json(data.launch_url);
  } catch (error: any) {
    console.log("ERROR: " + error);
    res.status(400).json({ message: "Internal Error" });
  }
};
