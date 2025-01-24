"use client";

import type { ServerUser } from "@/data/getServerUser";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import React from "react";

interface HomeCardProps {
  user: ServerUser | null;
}

export default function HomeCardContent({ user }: HomeCardProps) {
  const [meetingId, setMeetingId] = React.useState("");
  const [isCreatingMeeting, setIsCreatingMeeting] = React.useState(false);
  const [isJoiningMeeting, setIsJoiningMeeting] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleCreateMeeting = async () => {
    setIsCreatingMeeting(true);
    // Implement meeting creation logic here
    try {
      // Simulating API call to create a meeting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newMeetingId = Math.random().toString(36).substring(7);
      setMeetingId(newMeetingId);
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

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid meeting ID.",
        variant: "destructive",
      });
      return;
    }
    setIsJoiningMeeting(true);
    // Implement meeting join logic here
    try {
      // Simulating API call to join a meeting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/meeting/${meetingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to join meeting. Please check the meeting ID and try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoiningMeeting(false);
    }
  };

  return (
    <CardContent className="space-y-4">
      {user ? (
        <>
          <UserContent user={user} />
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
        </>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/auth")}
        >
          Sign In
        </Button>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-800 px-2 text-zinc-400">Or</span>
        </div>
      </div>
      <form onSubmit={handleJoinMeeting} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meetingId">Meeting ID</Label>
          <Input
            id="meetingId"
            placeholder="Enter meeting ID"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            className="bg-zinc-700 border-zinc-600 text-zinc-100"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isJoiningMeeting}>
          {isJoiningMeeting && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Join Meeting
        </Button>
      </form>
    </CardContent>
  );
}
