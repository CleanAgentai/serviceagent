import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

import {
  Search,
  Calendar,
  ArrowUpDown,
  Link as LinkIcon,
  Plus,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

interface Interview {
  id: string;
  title: string;
  createdAt: string;
  deadline: string;
  location?: string;
  interviewLink?: string;
}

export function ViewInterviews() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [interviews, setInterviews] = useState<Interview[]>([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [error, setError] = useState<string | null>(null);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error
      try {
        console.log("Fetching interviews...");
        const { data, error } = await supabase
          .from("interviews")
          .select("*")
          .order("created_at", { ascending: false });

        console.log("Supabase response:", { data, error });

        if (error) {
          console.error("Error fetching interviews:", error);
          setError(error.message);
          setInterviews([]); // Set to empty array on error
        } else if (data && data.length > 0) {
          console.log("Successfully fetched interviews:", data);
          const formattedInterviews = data.map((interview) => ({
            id: interview.id,
            title: interview.title,
            createdAt: new Date(interview.created_at).toLocaleDateString(
              "en-US"
            ),
            //.toISOString()
            //.split("T")[0],
            deadline: interview.deadline
              ? new Date(interview.deadline).toLocaleDateString("en-US")
              : "No deadline",

            interviewLink: interview.interview_link || "",
          }));
          setInterviews(formattedInterviews);
        } else {
          console.log("No interviews found in database.");
          setInterviews([]); // Set to empty array if no data found
        }
      } catch (err) {
        console.error("Error fetching interviews catch block:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setInterviews([]); // Set to empty array on catch
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleSort = (field: "date" | "title") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  const copyToClipboard = (link: string, id: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopiedLinkId(id);
        toast.success("Link copied!");
        setTimeout(() => setCopiedLinkId(null), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  const filteredInterviews = interviews
    .filter((interview) =>
      interview.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/interviews/create")}
        >
          <Plus className="w-4 h-4" />
          Create Interview
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search interviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-2"
                >
                  Title
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-2"
                >
                  Created Date
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                {/* intentionally empty header for copy button */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInterviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {interview.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {interview.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {interview.deadline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {interview.interviewLink ? (
                    <a
                      href={interview.interviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Open
                    </a>
                  ) : (
                    <span className="text-gray-300">No link</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {interview.interviewLink ? (
                    <button
                      onClick={() =>
                        copyToClipboard(interview.interviewLink!, interview.id)
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {copiedLinkId === interview.id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  ) : (
                    <Copy className="w-5 h-5 text-gray-300 cursor-not-allowed" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No interviews found matching your search criteria.
        </div>
      )}
    </div>
  );
}
