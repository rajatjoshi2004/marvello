
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import type { Review } from "@/types/business";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReviewsTableProps {
  reviews: Review[];
  onDeleteReview: (reviewId: string) => Promise<void>;
}

export function ReviewsTable({ reviews, onDeleteReview }: ReviewsTableProps) {
  const isMobile = useIsMobile();

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet.
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="p-4 border rounded-lg space-y-2 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <div className="font-medium">{review.reviewer_name}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteReview(review.id)}
                className="h-8 w-8 text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {review.mobile_number}
            </div>
            <div className="text-amber-500">{review.rating} ★</div>
            <div className="text-sm whitespace-pre-wrap">
              {review.feedback || "-"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Reviewer</TableHead>
            <TableHead className="w-[150px]">Mobile</TableHead>
            <TableHead className="w-[100px] text-center">Rating</TableHead>
            <TableHead className="max-w-[400px]">Feedback</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium align-top">{review.reviewer_name}</TableCell>
              <TableCell className="align-top">{review.mobile_number}</TableCell>
              <TableCell className="text-center align-top">{review.rating} ★</TableCell>
              <TableCell className="align-top">
                <div className="max-w-[400px] break-words whitespace-pre-wrap">
                  {review.feedback || "-"}
                </div>
              </TableCell>
              <TableCell className="align-top whitespace-nowrap">{new Date(review.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right align-top">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteReview(review.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
