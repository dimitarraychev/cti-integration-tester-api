import { Request, Response } from "express";
import crypto from "crypto";

let totalBalance = 123456;

export const softswissV2Service = (req: Request, res: Response): void => {
  //
};

export const generateHmacSha256Hex = (payload: string, PSK: string): string => {
  return crypto.createHmac("sha256", PSK).update(payload, "utf8").digest("hex");
};

export const generateSoftswissLaunchURL = async (
  req: Request,
  res: Response
) => {
  const { formData, apikey, psk } = req.body;
  const baseUrl = "https://rgs-stage-api.ctrgs.com:1381/softswiss-api/";
  const url = `${baseUrl}${apikey}/v2/a8r_provider.Launcher/Real`;
  const signature = generateHmacSha256Hex(formData, psk);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-REQUEST-SIGN": signature,
      },
      body: formData,
    });

    if (!response.ok) {
      res.status(400).json({ message: "Internal Error" });
    }

    const data = await response.json();

    res.json(data.launch_url);
  } catch (error: any) {
    res.status(400).json({ message: "Internal Error" });
  }
};
