import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Pencil, Trash2, Link, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Business = Database["public"]["Tables"]["businesses"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBusinessAndReviews();
  }, [id]);

  const fetchBusinessAndReviews = async () => {
    try {
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single();

      if (businessError) throw businessError;

      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("business_id", id)
        .order("created_at", { ascending: false });

      if (reviewsError) throw reviewsError;

      setBusiness(businessData);
      setReviews(reviewsData || []);
      setNewName(businessData.name);
      setNewUrl(businessData.google_review_url);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load business details.",
      });
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBusiness = async (field: 'name' | 'google_review_url' | 'logo_url', value: string) => {
    try {
      const { error } = await supabase
        .from("businesses")
        .update({ [field]: value })
        .eq("id", id!);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Business ${field.replace('_', ' ')} updated successfully!`,
      });

      fetchBusinessAndReviews();
      if (field === 'name') setIsEditingName(false);
      if (field === 'google_review_url') setShowUrlDialog(false);
    } catch (error: any) {
      console.error(`Error updating business ${field}:`, error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not update business ${field.replace('_', ' ')}.`,
      });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review deleted successfully!",
      });

      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error: any) {
      console.error("Error deleting review:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete review.",
      });
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('business_logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('business_logos')
        .getPublicUrl(filePath);

      await handleUpdateBusiness('logo_url', publicUrl);

      toast({
        title: "Success",
        description: "Logo uploaded successfully!",
      });
    } catch (error: any) {
      console.error("Error uploading logo:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not upload logo.",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!business) {
    return <div className="container py-8">Business not found.</div>;
  }

  return (
    <div className="container py-8">
      <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-6">
        Back to Dashboard
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={business.logo_url || ''} alt={business.name} />
                  <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label 
                  className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer hover:bg-primary/90"
                  htmlFor="logo-upload"
                >
                  <Upload className="h-4 w-4 text-primary-foreground" />
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button onClick={() => handleUpdateBusiness('name', newName)}>Save</Button>
                  <Button variant="outline" onClick={() => setIsEditingName(false)}>Cancel</Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CardTitle>{business.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingName(true)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowUrlDialog(true)}
          >
            <Link className="h-4 w-4" />
            Edit Review URL
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showUrlDialog} onOpenChange={setShowUrlDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Google Review URL</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter Google Review URL"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUrlDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateBusiness('google_review_url', newUrl)}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Reviewer</TableHead>
                <TableHead className="w-[100px] text-center">Rating</TableHead>
                <TableHead className="min-w-[300px]">Feedback</TableHead>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.reviewer_name}</TableCell>
                  <TableCell className="text-center">{review.rating} ★</TableCell>
                  <TableCell>{review.feedback || "-"}</TableCell>
                  <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteReview(review.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}