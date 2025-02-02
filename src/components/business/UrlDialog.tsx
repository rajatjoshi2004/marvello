import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Google Review URL</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Enter Google Review URL"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}