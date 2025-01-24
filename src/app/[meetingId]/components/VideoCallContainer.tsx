"use client";
import dynamic from "next/dynamic";

const VideoCall = dynamic<{ slug: string; jwt: string }>(
  () => import("./VideoCall"),
  { ssr: false }
);

export default function VideoCallContainer(props: {
  slug: string;
  jwt: string;
}) {
  return <VideoCall slug={props.slug} jwt={props.jwt} />;
}
