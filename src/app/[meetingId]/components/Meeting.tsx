"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ScrollArea } from "../../../components/ui/Scroll-area";
import { Card, CardContent } from "../../../components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  MonitorUp,
  LayoutGrid,
  Maximize2,
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatarUrl: string;
  isSpeaking: boolean;
  videoOn: boolean;
  audioOn: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
}

export default function MeetingSessionPage() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Alice Johnson",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isSpeaking: false,
      videoOn: true,
      audioOn: true,
    },
    {
      id: "2",
      name: "Bob Smith",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isSpeaking: true,
      videoOn: true,
      audioOn: true,
    },
    {
      id: "3",
      name: "Charlie Brown",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isSpeaking: false,
      videoOn: false,
      audioOn: false,
    },
  ]);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [layout, setLayout] = useState<"grid" | "presentation">("grid");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id;

  useEffect(() => {
    // Initialize WebRTC connection and join the meeting
    // This is where you'd implement the actual video conferencing logic
  }, []);

  const toggleCamera = () => setCameraOn(!cameraOn);
  const toggleMic = () => setMicOn(!micOn);
  const toggleScreenShare = () => setIsSharingScreen(!isSharingScreen);
  const toggleLayout = () =>
    setLayout(layout === "grid" ? "presentation" : "grid");
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const leaveMeeting = () => router.push("/");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newChatMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: "1", // Assuming the current user is Alice
        senderName: "Alice Johnson",
        text: newMessage,
        timestamp: new Date(),
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-900 text-zinc-100">
      <div className="flex-grow p-4 flex">
        <div
          className={`${
            isChatOpen ? "w-3/4" : "w-full"
          } transition-all duration-300 ease-in-out`}
        >
          <div
            className={`grid ${
              layout === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
            } gap-4`}
          >
            {participants.map((participant, index) => (
              <Card
                key={participant.id}
                className={`bg-zinc-800 ${
                  layout === "presentation" && index === 0
                    ? "col-span-full row-span-2"
                    : ""
                }`}
              >
                <CardContent className="p-0 relative">
                  <div className="aspect-video bg-zinc-700 rounded-lg flex items-center justify-center">
                    {participant.videoOn ? (
                      <video
                        className="w-full h-full object-cover rounded-lg"
                        autoPlay
                        muted
                        playsInline
                      />
                    ) : (
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          src={participant.avatarUrl}
                          alt={participant.name}
                        />
                        <AvatarFallback>
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center space-x-2 bg-zinc-900 bg-opacity-50 rounded-full px-2 py-1">
                    <span className="text-sm font-medium">
                      {participant.name}
                    </span>
                    {participant.audioOn ? (
                      <Mic className="h-4 w-4" />
                    ) : (
                      <MicOff className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {participant.isSpeaking && (
                    <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-pulse" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {isChatOpen && (
          <div className="w-1/4 ml-4 flex flex-col bg-zinc-800 rounded-lg">
            <div className="p-4 border-b border-zinc-700">
              <h2 className="text-xl font-semibold">Chat</h2>
            </div>
            <ScrollArea className="flex-grow p-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div className="flex items-center mb-1">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage
                        src={
                          participants.find((p) => p.id === message.senderId)
                            ?.avatarUrl
                        }
                      />
                      <AvatarFallback>
                        {message.senderName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{message.senderName}</span>
                    <span className="text-xs text-zinc-400 ml-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              ))}
            </ScrollArea>
            <form
              onSubmit={sendMessage}
              className="p-4 border-t border-zinc-700"
            >
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow bg-zinc-700 border-zinc-600 text-zinc-100"
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="bg-zinc-800 p-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            onClick={toggleCamera}
            variant={cameraOn ? "default" : "destructive"}
            size="icon"
          >
            {cameraOn ? (
              <Video className="h-4 w-4" />
            ) : (
              <VideoOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={toggleMic}
            variant={micOn ? "default" : "destructive"}
            size="icon"
          >
            {micOn ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={toggleScreenShare}
            variant={isSharingScreen ? "default" : "outline"}
            size="icon"
          >
            <MonitorUp className="h-4 w-4" />
          </Button>
          <Button onClick={toggleLayout} variant="outline" size="icon">
            {layout === "grid" ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={toggleChat}
            variant={isChatOpen ? "default" : "outline"}
            size="icon"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button onClick={leaveMeeting} variant="destructive" size="icon">
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
