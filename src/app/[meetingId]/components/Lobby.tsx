"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Mic, Video, VideoOff, MicOff, Settings } from "lucide-react";

export default function MeetingLobbyPage() {
  const [name, setName] = useState("");
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [volume, setVolume] = useState(50);
  const [devices, setDevices] = useState({
    cameras: [] as MediaDeviceInfo[],
    mics: [] as MediaDeviceInfo[],
  });
  const [showSettings, setShowSettings] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id;

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }
        getDevices();
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    getUserMedia();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        for (const track of stream.getTracks()) {
          track.stop();
        }
      }
    };
  }, []);

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const mics = devices.filter((device) => device.kind === "audioinput");
      setDevices({ cameras, mics });
      if (cameras.length) setSelectedCamera(cameras[0].deviceId);
      if (mics.length) setSelectedMic(mics[0].deviceId);
    } catch (err) {
      console.error("Error getting devices:", err);
    }
  };

  const toggleCamera = () => {
    setCameraOn(!cameraOn);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current?.srcObject as MediaStream;
      for (const track of stream.getVideoTracks()) {
        track.enabled = !cameraOn;
      }
    }
  };

  const toggleMic = () => {
    setMicOn(!micOn);
    if (audioRef.current?.srcObject) {
      const audioStream = audioRef.current.srcObject as MediaStream;
      for (const track of audioStream.getAudioTracks()) {
        track.enabled = !micOn;
      }
    }
  };

  const handleCameraChange = async (deviceId: string) => {
    setSelectedCamera(deviceId);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error changing camera:", err);
    }
  };

  const handleMicChange = async (deviceId: string) => {
    setSelectedMic(deviceId);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
      });
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error changing microphone:", err);
    }
  };

  const joinMeeting = () => {
    if (name) {
      // Implement actual meeting join logic here
      router.push(`/meeting/${meetingId}/session`);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-700">
      <Card className="w-full max-w-4xl bg-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome to Your Meeting
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Set up your audio and video before joining
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!cameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                    <VideoOff className="w-16 h-16 text-zinc-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={toggleCamera}
                  variant={cameraOn ? "default" : "outline"}
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
                  variant={micOn ? "default" : "outline"}
                  size="icon"
                >
                  {micOn ? (
                    <Mic className="h-4 w-4" />
                  ) : (
                    <MicOff className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  variant="outline"
                  size="icon"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-zinc-400">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-zinc-700 border-zinc-600 text-zinc-100"
                />
              </div>
              {showSettings && (
                <>
                  <div>
                    <Label htmlFor="camera" className="text-zinc-400">
                      Camera
                    </Label>
                    <Select
                      value={selectedCamera}
                      onValueChange={handleCameraChange}
                    >
                      <SelectTrigger
                        id="camera"
                        className="bg-zinc-700 border-zinc-600 text-zinc-100"
                      >
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.cameras.map((camera) => (
                          <SelectItem
                            key={camera.deviceId}
                            value={camera.deviceId}
                          >
                            {camera.label ||
                              `Camera ${camera.deviceId.substr(0, 5)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="microphone" className="text-zinc-400">
                      Microphone
                    </Label>
                    <Select value={selectedMic} onValueChange={handleMicChange}>
                      <SelectTrigger
                        id="microphone"
                        className="bg-zinc-700 border-zinc-600 text-zinc-100"
                      >
                        <SelectValue placeholder="Select microphone" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.mics.map((mic) => (
                          <SelectItem key={mic.deviceId} value={mic.deviceId}>
                            {mic.label ||
                              `Microphone ${mic.deviceId.substr(0, 5)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="volume" className="text-zinc-400">
                      Microphone Volume
                    </Label>
                    <Slider
                      id="volume"
                      min={0}
                      max={100}
                      step={1}
                      value={[volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      className="py-4"
                    />
                  </div>
                </>
              )}
              <audio
                ref={audioRef}
                autoPlay
                muted
                playsInline
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={joinMeeting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Join Meeting
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
