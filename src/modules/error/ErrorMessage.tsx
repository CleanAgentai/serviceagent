import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

type ErrorMessageProps = {
  title?: string;
  message?: string;
  backTo?: string;
  backLabel?: string;
};

export default function ErrorMessage({
  title = "An error occured",
  message = "Please try again later.",
  backTo = "/",
  backLabel = "Go back",
}: ErrorMessageProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center flex flex-col !min-h-0 gap-6">
        <div className="mx-auto inline-flex items-center justify-center w-20 h-20 bg-terracotta/10 rounded-full">
          <AlertCircle className="w-10 h-10 text-terracotta" />
        </div>
        <h1 className="text-6xl font-bold text-primary">{title}</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">{message}</p>
        <Link
          to={backTo}
          className="mx-auto group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <ArrowLeft className="w-4 h-4 inline-block mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}


