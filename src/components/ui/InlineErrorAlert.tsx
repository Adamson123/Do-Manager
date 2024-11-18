import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "./alert";

const InlineErrorAlert = ({ error }: { error: string }) => {
  return (
    <Alert className="bg-destructive/15 text-destructive  border-none">
      <AlertDescription>
        <AlertTriangle className="inline w-4 h-4 -translate-y-[1px]" /> {error}
      </AlertDescription>
    </Alert>
  );
};

export default InlineErrorAlert;
