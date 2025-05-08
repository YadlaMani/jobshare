"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { X, ExternalLink, Filter } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  link: string;
  description: string;
  type: string;
  tags: string[];
  createdAt: string;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Remote");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Full Time");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    tag: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function fetchJobs() {
    try {
      const res = await axios.get("/api/jobs", {
        params: {
          type: filters.type,
          location: filters.location,
          tag: filters.tag,
        },
      });
      if (res.status === 200) {
        setJobs(res.data);
        console.log(filteredJobs);
        setFilteredJobs(res.data);
      } else {
        toast.error("Failed to fetch jobs");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch jobs");
    }
  }

  const handleSubmit = async () => {
    if (!title || !company || !link || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const res = await axios.post("/api/jobs", {
        title,
        company,
        location,
        link,
        description,
        type,
        tags,
      });

      if (res.status === 200) {
        toast.success("Job submitted successfully");
        fetchJobs();
        setDialogOpen(false);
      }

      setTitle("");
      setCompany("");
      setLocation("Remote");
      setLink("");
      setDescription("");
      setType("Full Time");
      setTags([]);
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit job");
    }
  };

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const resetFilters = () => {
    setFilters({
      type: "",
      location: "",
      tag: "",
    });
    fetchJobs();
    setShowFilters(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Job Board</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" onClick={() => setDialogOpen(true)}>
                  Add Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Submit a Job</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Input
                    placeholder="Job Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    placeholder="Company Name *"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <Input
                    placeholder="Job Link *"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <Textarea
                    placeholder="Job Description *"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Location (Optional)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tags (e.g., React, Node.js)"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="secondary"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((t, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {t}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTag(t)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSubmit}>Submit</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select
                    value={filters.type}
                    onValueChange={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full Time">Full Time</SelectItem>
                      <SelectItem value="Part Time">Part Time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    placeholder="Filter by Location"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Filter by Tag"
                    value={filters.tag}
                    onChange={(e) =>
                      setFilters({ ...filters, tag: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card key={job._id.toString()} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {job.company}
                      </p>
                    </div>
                    <Badge>{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-2">{job.location}</p>
                  <p className="text-sm line-clamp-3 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.tags &&
                      job.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Apply <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                No jobs found. Try adjusting your filters or add a new job.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
