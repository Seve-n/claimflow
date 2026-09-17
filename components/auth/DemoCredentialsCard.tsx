import { KeyRound, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoCredentialsCardProps {
  onFill: () => void;
}

/** Prominent callout on the login page surfacing the demo account and an autofill shortcut. */
export function DemoCredentialsCard({ onFill }: DemoCredentialsCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-info-border bg-info-bg px-4 py-3">
      <div className="flex items-start gap-2.5">
        <KeyRound className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
        <div className="flex flex-col gap-0.5 text-sm">
          <p className="font-medium text-info">Try the live demo</p>
          <p className="text-info/80">
            <span className="font-mono text-xs">demo@claimflow.app</span>
            {" · "}
            <span className="font-mono text-xs">Demo123!</span>
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start border-info-border bg-card text-info hover:bg-info-bg/60"
        onClick={onFill}
      >
        <Wand2 className="size-3.5" aria-hidden="true" />
        Fill demo credentials
      </Button>
    </div>
  );
}
