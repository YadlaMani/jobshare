import { NextResponse, type NextRequest } from "next/server";
import JobModel from "@/models/jobModel";
import dbConnect from "@/utils/dbConnect";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const location = url.searchParams.get("location");
    const tag = url.searchParams.get("tag");

    const query: any = {};

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

    const { title, company, location, link, description, type, tags } = body;

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

    return new NextResponse("Job saved successfully", { status: 200 });
  } catch (error) {
    console.error("Error saving job:", error);

    return new NextResponse("Error saving job", { status: 500 });
  }
};
