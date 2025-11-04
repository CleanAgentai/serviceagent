import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/app/lib/utils";
import { ArrowRight, Calendar, GripVertical, Copy, Check } from "lucide-react";
import { getBadgeBgColorForScore, getTextColorForScore } from "@/components/ui/statbar";
import { Applicant } from "@/types/interview";
import { toast } from "sonner";

interface ApplicantCardProps {
  applicant: Applicant;
  interviewTitle: string;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  dragOverColumn?: string | null;
}

export const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant,
  interviewTitle,
  isDragging = false,
  dragHandleProps,
  dragOverColumn,
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const email = applicant.candidate?.email;
    if (!email) return;
    
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  const getBorderColor = () => {
    if (!isDragging || !dragOverColumn) return "";
    if (dragOverColumn === "Hired") return "border-teal";
    if (dragOverColumn === "Rejected") return "border-terracotta";
    return "";
  };

  return (
    <Card className={cn(
      "w-full border-2 p-6 shadow-none hover:shadow-lg transition-all duration-300 relative",
      isDragging && "shadow-xl",
      getBorderColor(),
      !isDragging && "border-transparent"
    )}>
      <div 
        {...dragHandleProps}
        className="absolute top-2 left-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing z-10"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
          <Link to={`/interviews/responses/${applicant.id}`} className="group block" state={{
              candidateName: applicant.candidate?.name,
              interviewTitle: interviewTitle,
            }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                {applicant.candidate?.name?.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:underline">
                {applicant.candidate?.name}
              </h3>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
            </div>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-sm text-gray-500 truncate">
                {applicant.candidate?.email}
              </p>
              {applicant.candidate?.email && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyEmail}
                  className="h-8 w-8 p-0 hover:bg-gray-100 shrink-0 rounded-full transition-all duration-200 relative"
                  aria-label="Copy email"
                  title="Copy email"
                >
                  <Check 
                    className={cn(
                      "w-5 h-5 text-teal absolute inset-0 m-auto transition-opacity duration-300",
                      copied ? "opacity-100" : "opacity-0 pointer-events-none"
                    )} 
                  />
                  <Copy 
                    className={cn(
                      "w-5 h-5 text-muted-foreground absolute inset-0 m-auto transition-opacity duration-300",
                      copied ? "opacity-0 pointer-events-none" : "opacity-100"
                    )} 
                  />
                </Button>
              )}
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 border select-none",
              applicant.status === "Hired"
                ? "bg-gradient-to-br from-teal/10 to-teal/20 text-teal border-teal"
                : applicant.status === "Rejected"
                ? "bg-gradient-to-br from-terracotta/10 to-terracotta/15 text-terracotta border-terracotta"
                : "bg-gray-100 text-primary border-gray-300"
            )}
          >
            {applicant.status}
          </Badge>
        </div>

        {/* Submitted date and score */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{applicant.createdAt}</span>
          </div>
          {applicant.score !== null && (
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 border font-semibold",
                getTextColorForScore(applicant.score),
                getBadgeBgColorForScore(applicant.score)
              )}
            >
              {applicant.score}/10
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

