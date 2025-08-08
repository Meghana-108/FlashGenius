"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardFormProps {
  onGenerate: (formData: FormData) => void;
  loading: boolean;
  hasGenerated: boolean;
}

export function FlashcardForm({
  onGenerate,
  loading,
  hasGenerated,
}: FlashcardFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    onGenerate(formData);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2"
    >
      <Input
        name="topic"
        type="text"
        placeholder="Enter a topic, e.g., 'Photosynthesis'"
        className="h-12 flex-1 text-base"
        disabled={loading}
        required
        minLength={3}
      />
      <Button
        type="submit"
        size="lg"
        className={cn(
          "h-12 min-w-[150px] font-bold transition-all duration-300",
          hasGenerated && !loading && "bg-accent hover:bg-accent/90"
        )}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : hasGenerated ? (
          <>
            <RefreshCw className="mr-2 h-5 w-5" />
            Regenerate
          </>
        ) : (
          "Generate"
        )}
      </Button>
    </form>
  );
}
