import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    default: "Remote",
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["Full Time", "Part Time", "Internship", "Contract"],
    default: "Full Time",
  },
});
const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default JobModel;
