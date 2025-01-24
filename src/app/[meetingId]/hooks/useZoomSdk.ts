import ZoomVideo, { VideoClient } from "@zoom/videosdk";
import { useRef } from "react";

export default function useZoomSdk(){
    const client = useRef<typeof VideoClient>(ZoomVideo.createClient());

    const [isVideoMuted, setIsVideoMuted] = useState(
        !client.current.getCurrentUserInfo()?.bVideoOn
      );
      const [isAudioMuted, setIsAudioMuted] = useState(
        client.current.getCurrentUserInfo()?.muted ?? true
      );
}