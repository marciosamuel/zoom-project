"use client";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

// TODO: Implement meeting creation logic

export default function CreateMeetingButton() {
  const [isCreatingMeeting, setIsCreatingMeeting] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleCreateMeeting = async () => {
    setIsCreatingMeeting(true);
    // Implement meeting creation logic here
    try {
      // Simulating API call to create a meeting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newMeetingId = Math.random().toString(36).substring(7);
      toast({
        title: "Meeting Created",
        description: `Your meeting ID is ${newMeetingId}`,
      });
      router.push(`/meeting/${newMeetingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  return (
    <Button
      className="w-full bg-emerald-600 hover:bg-emerald-700"
      onClick={handleCreateMeeting}
      disabled={isCreatingMeeting}
    >
      {isCreatingMeeting && (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      )}
      Create New Meeting
    </Button>
  );
}
