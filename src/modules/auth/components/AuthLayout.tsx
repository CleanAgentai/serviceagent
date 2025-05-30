  <div className="min-h-screen w-full bg-slate-100">
    <Navigation />
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img 
            src="/Banner_SA_new.svg" 
            alt="ServiceAgent Logo" 
            className="h-12 w-auto mb-8"
          />
        </div>
        {children}
      </div>
    </div>
  </div> 