import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./alert";

const InlineSuccessAlert = ({ success }: { success: string }) => {
  return (
    <Alert className="bg-emerald-500/15 text-emerald-500  border-none">
      <AlertDescription style={{ whiteSpace: "pre-line" }}>
        <CheckCircle className="inline w-4 h-4 -translate-y-[1px]" /> {success}
      </AlertDescription>
    </Alert>
  );
};

export default InlineSuccessAlert;
