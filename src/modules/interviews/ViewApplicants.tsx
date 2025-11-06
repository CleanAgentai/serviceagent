import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/common/Loading.tsx";
import ErrorMessage from "@/modules/error/ErrorMessage";
import { supabase } from "@/app/lib/supabase";
import { Building, MapPin, CalendarClock, Pencil, Trash2, Copy, Eye, Filter, FilterX, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Applicant, Candidate, InterviewAttempt } from "@/types/interview";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/app/lib/utils";
import { ApplicantCard } from "./ApplicantCard";
import {KanbanProvider, KanbanBoard, KanbanHeader, KanbanCards, KanbanCard} from "@/components/ui/kanban";

const fetchApplicants = async (willoInterviewKey: string) => {
  const { data: applicants, error } = await supabase
    .from("interview_attempts")
    .select(`
      id,
      created_at,
      status,
      qualified,
      candidates ( email, name, phone ),
      evaluation_results ( general_score )
    `)
    .eq("interview_id", willoInterviewKey)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching applicants:", error);
    return [];
  }

  console.log("Raw applicants data:", applicants);

  return (applicants ?? []).map((a: any) => ({
    id: a.id,
    createdAt: new Date(a.created_at).toLocaleDateString("en-US"),
    createdAtDate: new Date(a.created_at),
    status: a.status,
    qualified: a.qualified,
    candidate: a.candidates ?? null,
    score: a.evaluation_results?.general_score ?? null,
  }));
};


export function ViewApplicants() {
    const navigate = useNavigate();
    const { interviewId } = useParams<{ interviewId: string }>();
    const [interviewLink, setInterviewLink] = useState<string | null>(null);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(true);
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
    const [interviewTitle, setInterviewTitle] = useState<string>("");
    const [companyName, setCompanyName] = useState<string | null>(null);
    const [jobLocation, setJobLocation] = useState<string | null>(null);
    const [deadline, setDeadline] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "Pending" | "Rejected" | "Hired">("ALL");
    const [overallRating, setOverallRating] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"most-recent" | "oldest-first">("most-recent");
    
    /* Calculate the number of active filters */
    const activeFiltersCount = useMemo(() => {
        return (statusFilter !== "ALL" ? 1 : 0) + (overallRating !== 0 ? 1 : 0);
    }, [statusFilter, overallRating]);

    /* Filter applicants based on search term, status, and score */
    const filteredApplicants = useMemo(() => {
        const filtered = applicants.filter((applicant) => {

            /* Search filter (name or email) */
            const matchesSearch = !searchTerm || 
                applicant.candidate?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.candidate?.email?.toLowerCase().includes(searchTerm.toLowerCase());
            
            /* Status filter */
            const matchesStatus = statusFilter === "ALL" || applicant.status === statusFilter;
            
            /* Score filter (if score is set and applicant has a score) */
            const matchesScore = overallRating === 0 || 
                applicant.score === null ||
                applicant.score >= overallRating;
            
            return matchesSearch && matchesStatus && matchesScore;
        });

        /* Sort by date */
        return filtered.sort((a, b) => {
            const dateA = a.createdAtDate?.getTime() ?? new Date(a.createdAt).getTime();
            const dateB = b.createdAtDate?.getTime() ?? new Date(b.createdAt).getTime();
            
            if (sortOrder === "most-recent") {
                return dateB - dateA; // Descending (newest first)
            } else {
                return dateA - dateB; // Ascending (oldest first)
            }
        });
    }, [applicants, searchTerm, statusFilter, overallRating, sortOrder]);

    /* Group applicants by status for Kanban board */
    const applicantsByStatus = useMemo(() => {
        const grouped = {
            Pending: [] as Applicant[],
            Rejected: [] as Applicant[],
            Hired: [] as Applicant[],
        };
        
        filteredApplicants.forEach((applicant) => {
            const status = applicant.status as keyof typeof grouped;
            if (grouped[status]) {
                grouped[status].push(applicant);
            } else {
                // If status doesn't match, put it in Pending
                grouped.Pending.push(applicant);
            }
        });
        
        return grouped;
    }, [filteredApplicants]);

    const kanbanColumns = useMemo(() => {
      const allColumns = [
        { id: "Pending", name: "Pending" },
        { id: "Rejected", name: "Rejected" },
        { id: "Hired", name: "Hired" },
      ];
      
      if (statusFilter === "ALL") {
        return allColumns;
      }
      
      return allColumns.filter(col => col.id === statusFilter);
    }, [statusFilter]);
    
    const kanbanData = useMemo(
      () =>
        filteredApplicants.map((a) => ({
          id: a.id,
          name: a.candidate?.name || a.candidate?.email,
          column: (["Pending", "Rejected", "Hired"].includes(a.status as string) ? a.status as string : "Pending") as "Pending" | "Rejected" | "Hired",
          applicant: a as Applicant,
        })),
      [filteredApplicants]
    );

  useEffect(() => {
    if (!interviewId) {
      setError("Missing interview id");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const applicants = await fetchApplicants(interviewId);
        setApplicants(applicants as Applicant[]);

        /* Fetch interview + company information */
        const { data, error } = await supabase
        .from("interviews")
        .select(`
          title,
          department,
          interview_link,
          deadline,
          company:company_profiles!fk_department_to_company_key (
            company_name,
            company_location,
            company_logo_url,
            company_website
          ),
          owner:profiles!interviews_user_id_fkey (
            company_name
          )
        `)
        .eq("willo_interview_key", interviewId)
        .maybeSingle();
      
      if (error) throw error;
      
      setInterviewTitle(data?.title ?? "Interview");
      setInterviewLink(data?.interview_link as string | null);
      const company = Array.isArray(data?.company) ? data.company[0] : data?.company;
      const owner = Array.isArray(data?.owner) ? data.owner[0] : data?.owner;

      setCompanyName(company?.company_name ?? owner?.company_name ?? null);
      setJobLocation(company?.company_location ?? null);
      setDeadline(data?.deadline ?? null);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    })();
  }, [interviewId]);

  const title = useMemo(
    () => `${interviewTitle || "Interview"}`,
    [interviewTitle]
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="An error occured"
        message="Please try again later."
        backTo="/interviews"
        backLabel="Go back to interviews"
      />
    );
  }

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
        .eq("willo_interview_key", deleteConfirmation.interviewId);

      if (error) throw error;

      toast.success("Interview deleted successfully");

      /* Navigate back to interviews page after deleting */
      navigate("/interviews"); 

    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    } finally {
      setDeleteConfirmation({ show: false, interviewId: "", interviewTitle: "" });
    }
  };



const persistStatusChanges = async (changes: Array<{ id: string; newStatus: "Pending" | "Rejected" | "Hired"; }>) => {
  if (changes.length === 0) return;

  try {

    await Promise.all(
      changes.map(({ id, newStatus }) =>
        supabase
          .from("interview_attempts")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("id", id)
      )
    );
    toast.success("Status updated");
  } catch (e) {
    console.error("Failed to update status:", e);
    toast.error("Failed to update status");
    // If something failed, refetch to re-sync
    const refreshed = await fetchApplicants(interviewId!);
    setApplicants(refreshed as Applicant[]);
  }
};

const handleKanbanDataChange = async (
    next: Array<{ id: string; name: string; column: "Pending" | "Rejected" | "Hired"; applicant: Applicant }>
) => {
 

  const prevById = new Map(kanbanData.map((i) => [i.id, i]));
  const columnChanges: Array<{ id: string; newStatus: "Pending" | "Rejected" | "Hired" }> = [];

  next.forEach((n) => {
    const p = prevById.get(n.id);
    if (p && p.column !== n.column) {
      columnChanges.push({ id: n.id, newStatus: n.column });
    }
  });

  setApplicants((prev) => {
    const byId = new Map(prev.map((a) => [a.id, a]));
    columnChanges.forEach(({ id, newStatus }) => {
      const a = byId.get(id);
      if (a) byId.set(id, { ...a, status: newStatus });
    });
    const ordered = next
      .map((n) => {
        const base = byId.get(n.id);
        return base ? base : null;
      })
      .filter(Boolean) as Applicant[];

    const leftover = prev.filter((a) => !byId.has(a.id));
    return [...ordered, ...leftover];
  });

  await persistStatusChanges(columnChanges);
};

const isActive = new Date(deadline) > new Date();



//   if (applicants.length === 0) {
//     return (
//         <div className="min-h-[80vh] flex items-center justify-center">
//           <div className="text-center flex flex-col gap-6">
//             <h1 className="text-6xl font-bold text-gray-900">No one's applied just yet</h1>
//             <p className="text-xl text-gray-600 max-w-md mx-auto">Share your interview link with your candidates to start recieving applications.</p>
//             <Link
//               to="/interviews"
//               className="mx-auto group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full
//              border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//                Go back to interviews
//                <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//           </div>
//         </div>
//       );
//   }

  return (
      <div className="mx-auto w-full px-2 sm:px-4 md:px-6 lg:px-8 sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl">
      <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="inline-flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            size="icon"
            className="h-8 w-8 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Users className="w-6 h-6 inline-block whitespace-nowrap" />
              {applicants.length} applicants
            </span>
        </div>
       </div>
        <div className="flex gap-4 text-primary mb-4">
          {companyName && (
            <span className="inline-flex text-md font-medium">
              <Building className="w-6 h-6 inline-block mr-2" /> 
              {companyName}
            </span>
          )}
          {jobLocation && (
            <span className="inline-flex text-md font-medium">
              <MapPin className="w-6 h-6 inline-block mr-2" /> 
              {jobLocation}
            </span>
          )}
        </div>
        <div className="flex gap-4 text-primary mb-12">
        {deadline && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex text-md text-muted-foreground font-medium italic">
              <CalendarClock className="w-6 h-6 inline-block mr-2" /> 
              <span className="select-none">Deadline:</span>
              <span className="ml-1">{new Date(deadline).toLocaleDateString("en-US")}</span>
            </span>
            
      <span className={cn(
        "px-2 py-1 rounded-full font-medium select-none",
        isActive ? "bg-gradient-to-br from-teal/10 to-teal/20 text-teal" : "bg-gradient-to-br from-terracotta/10 to-terracotta/20 text-terracotta"
      )}>{isActive ? "Live" : "Inactive"}</span>
          </div>
          )}
        </div>

        <div className="flex items-center gap-2">
            <Link to={`${interviewLink}`} target="_blank" className="block">
                <Button className="group inline-flex bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Preview interview">
                    
                    <Eye className="w-4 h-4 inline-block mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Preview
                </Button>
            </Link>
            <Button variant="outline" className="w-10 h-10 items-center justify-center text-green-600 hover:bg-green-100 hover:text-green-600 rounded-full border-2 hover:border-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent !p-0"
                aria-label="Share interview"
                onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(interviewLink, interviewId);
                }}>
                <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-10 h-10 items-center justify-center text-blue-600 hover:bg-blue-100 hover:text-blue-600 rounded-full border-2 hover:border-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent !p-0"
                aria-label="Edit interview"
                onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(interviewId);
                }}>
                <Pencil className="w-4 h-4" />
            </Button>

            <Button variant="outline" className="w-10 h-10 items-center justify-center text-red-600 hover:bg-red-100 hover:text-red-600 rounded-full border-2 hover:border-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent !p-0"
                aria-label="Delete interview"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(interviewId, interviewTitle);
                }}>
                <Trash2 className="w-4 h-4 text-terracotta" />
            </Button>
        </div> 

        <div className="w-full h-px shadow-lg bg-gray-200 my-12" />

       {/* Search candidates */}
        <div className="p-4 mb-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-lg">
            <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2"
                        aria-label="Open filters menu"
                    >
                        <Filter className="w-4 h-4 shrink-0" />
                        <span className="font-medium">Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-blue-600 text-white">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-64 mt-4">
                    <DropdownMenuLabel className="text-lg font-medium">Filters</DropdownMenuLabel>
                    <div className="inline-flex justify-between items-center gap-2">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <div className="px-2 py-1">
                            <Select
                                value={statusFilter}
                                onValueChange={(v) => setStatusFilter(v as "ALL" | "Pending" | "Rejected" | "Hired")}
                            >
                                <SelectTrigger className="w-32 h-9">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL" className="w-full">All</SelectItem>
                                    <SelectItem value="Pending" className="w-full">Pending</SelectItem>
                                    <SelectItem value="Hired" className="w-full">Hired</SelectItem>
                                    <SelectItem value="Rejected" className="w-full">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="mt-2">Sort by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={sortOrder} onValueChange={(v) => setSortOrder(v as "most-recent" | "oldest-first")}>
                        <DropdownMenuRadioItem value="most-recent" className="cursor-pointer">
                            Most recent
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="oldest-first" className="cursor-pointer">
                            Oldest first
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    
                    {activeFiltersCount > 0 && (
                    <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setStatusFilter("ALL")}
                        disabled={activeFiltersCount <= 0}
                        className={cn(
                            "text-red-600 focus:text-red-700 cursor-pointer",
                            activeFiltersCount <= 0 && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <FilterX className="w-4 h-4 mr-2" />
                        Clear filters
                    </DropdownMenuItem>
                    </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
                <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Search candidates by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full min-w-0 max-w-full"
                />
                </div>
            </div>
      </div>
        
        {/* Kanban Board */}
        <KanbanProvider
        columns={kanbanColumns}
        data={kanbanData}
        onDataChange={handleKanbanDataChange}
      >
      {(column) => (
        <KanbanBoard id={column.id} className="mt-2">
          <KanbanHeader className="flex items-baseline justify-between">
            <div className="text-md font-semibold text-primary">
              {column.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {applicantsByStatus[column.id as keyof typeof applicantsByStatus]?.length || 0} applicants
            </div>
          </KanbanHeader>

          <KanbanCards
            id={column.id}
            className="min-h-[200px]"
          >
            {(item: (typeof kanbanData)[number]) => (
              <KanbanCard
                key={item.id}
                id={item.id}
                name={item.name}
                column={column.id}
                className="!p-0 !border-0 shrink-0 w-[320px] lg:w-full"
              >
                {/* Render your existing ApplicantCard */}
                <ApplicantCard
                  applicant={item.applicant}
                  interviewTitle={interviewTitle}
                />
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>


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
                    className="px-6 hover:bg-gray-50 hover:text-primary"
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