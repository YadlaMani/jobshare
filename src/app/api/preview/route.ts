import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const getMeta = (name: string) =>
      $(`meta[property='og:${name}']`).attr("content") || "";

    const preview = {
      title: getMeta("title"),
      description: getMeta("description"),
      image: getMeta("image"),
      url,
    };

    res.status(200).json(preview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch preview" });
  }
}
