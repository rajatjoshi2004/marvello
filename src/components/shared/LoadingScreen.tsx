import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="space-y-8 w-full max-w-md px-4">
        {/* Logo placeholder */}
        <Skeleton className="h-12 w-48 mx-auto" />
        
        {/* Content placeholders */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        {/* Button placeholder */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}