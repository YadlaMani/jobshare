import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  company: string;
  link: string;
  description: string;
  type: string;
  location: string;
  tags: string[];
}

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [preview, setPreview] = useState<{
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }>({});

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await axios.get(`https://api.microlink.io`, {
          params: {
            url: job.link,
          },
        });

        setPreview(res.data.data);
      } catch (err) {
        console.log(err);
        console.log("No preview available");
      }
    };

    fetchPreview();
  }, [job.link]);

  return (
    <Card
      key={job._id}
      className="group relative flex flex-col justify-between h-full p-4 rounded-2xl border border-blue-100 dark:border-blue-900 bg-white/70 dark:bg-background/60 backdrop-blur-md shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-300">
              {job.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
          </div>
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </a>
        </div>

        {preview.title && (
          <div className="rounded-md border p-2 my-2 bg-muted">
            {preview.image && (
              <img
                src={preview.image}
                alt="preview"
                className="w-full h-32 object-cover rounded"
              />
            )}
            <h4 className="font-semibold text-sm mt-2">{preview.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {preview.description}
            </p>
          </div>
        )}

        <CardContent className="text-sm text-muted-foreground line-clamp-4 px-0">
          {job.description}
        </CardContent>
      </div>

      <CardFooter className="flex flex-wrap gap-2 mt-4 px-0">
        <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
          {job.type}
        </Badge>
        <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full text-xs">
          {job.location}
        </Badge>
        {job.tags.map((t, i) => (
          <Badge
            key={i}
            className="bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300 px-3 py-1 rounded-full text-xs"
          >
            {t}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};
