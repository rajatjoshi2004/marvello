
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface UrlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  onUrlChange: (value: string) => void;
  onSave: () => void;
}

export function UrlDialog({
  open,
  onOpenChange,
  url,
  onUrlChange,
  onSave,
}: UrlDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle>Edit Google Review URL</DialogTitle>
          <DialogDescription>
            Update your business's Google Review URL here. This URL will be used for collecting customer reviews.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Enter Google Review URL"
            className="w-full"
          />
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={onSave} className="w-full sm:w-auto">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
