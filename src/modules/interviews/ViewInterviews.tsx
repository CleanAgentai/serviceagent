import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Trash2, Pencil } from "lucide-react";
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
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    interviewId: string;
    interviewTitle: string;
  }>({
    show: false,
    interviewId: "",
    interviewTitle: "",
  });

  const handleEdit = (interviewId: string) => {
    navigate(`/interviews/edit/${interviewId}`);
  };

  const handleDelete = async (interviewId: string, interviewTitle: string) => {
    setDeleteConfirmation({
      show: true,
      interviewId,
      interviewTitle,
    });
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from("interviews")
        .delete()
        .eq("id", deleteConfirmation.interviewId);

      if (error) throw error;

      setInterviews((prevInterviews) =>
        prevInterviews.filter((interview) => interview.id !== deleteConfirmation.interviewId)
      );
      toast.success("Interview deleted successfully");
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    } finally {
      setDeleteConfirmation({ show: false, interviewId: "", interviewTitle: "" });
    }
  };

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
    <div className="w-full min-w-[90%] px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <Button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onClick={() => navigate("/interviews/create")}
        >
          <Plus className="w-4 h-4" />
          Create Interview
        </Button>
      </div>

      <Card className="p-4 mb-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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

      <div className="bg-white rounded-lg border-0 shadow-lg">
      <div
          className="container m-0 overflow-scroll"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-2"
                >
                  TITLE
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-2"
                >
                  CREATED DATE
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {interview.interviewLink ? (
                    <a
                      href={interview.interviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm hover:shadow-md transform hover:scale-101 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <LinkIcon className="w-3 h-3 mr-1.5" />
                      Open Link
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-md">
                      No Link
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    {interview.interviewLink && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(interview.interviewLink!, interview.id);
                        }}
                        aria-label="Copy link"
                        className="hover:bg-green-50"
                      >
                        {copiedLinkId === interview.id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(interview.id);
                      }}
                      aria-label="Edit interview"
                      className="hover:bg-blue-50"
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(interview.id, interview.title);
                      }}
                      aria-label="Delete interview"
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No interviews found matching your search criteria.
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Delete Interview
              </h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete this interview?<br />
                All responses associated with this interview will be deleted.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirmation({ show: false, interviewId: "", interviewTitle: "" })}
                  className="px-6 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 transition-colors duration-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
