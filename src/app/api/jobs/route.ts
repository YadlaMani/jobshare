import { NextResponse, type NextRequest } from "next/server";
import JobModel from "@/models/jobModel";
import dbConnect from "@/utils/dbConnect";
import axios from "axios";
interface JobQuery {
  type?: string;
  location?: { $regex: string; $options: string };
  tags?: { $regex: string; $options: string };
}
async function isLinkAlive(url: string) {
  try {
    const res = await axios.get(url, {
      timeout: 5000,
      maxRedirects: 5,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; JobBot/1.0; +https://example.com/bot)",
      },
    });
    return res.status >= 200 && res.status < 400;
  } catch (err) {
    return false;
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const location = url.searchParams.get("location");
    const tag = url.searchParams.get("tag");

    const query: JobQuery = {};

    if (type) {
      query.type = type;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (tag) {
      query.tags = { $regex: tag, $options: "i" };
    }

    const jobs = await JobModel.find(query).sort({ createdAt: -1 });

    return NextResponse.json(jobs);
  } catch (err) {
    console.log("Error getting jobs", err);
    return NextResponse.json("Error getting jobs", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({
        message: "Body is required",
        status: 400,
      });
    }

    const { title, company, location, link, description, type, tags } = body;
    if (!title || !company || !link) {
      return NextResponse.json({
        message: "Title, company and link are required",
        success: false,
      });
    }

    let isLinkValid = await isLinkAlive(link);
    if (isLinkValid === false) {
      return NextResponse.json({
        message: "Link is not valid",
        success: false,
      });
    }

    const newJob = new JobModel({
      title,
      company,
      location,
      link,
      description,
      type,
      tags: tags || [],
    });

    await newJob.save();

    return NextResponse.json({
      message: "Job saved successfully",
      job: newJob,
      success: true,
    });
  } catch (error) {
    console.error("Error saving job:", error);

    return NextResponse.json({
      message: "Error saving job",
      success: false,
    });
  }
};
