import { getData } from "@/data/getToken";
import Script from "next/script";
import VideoCallContainer from "./components/VideoCallContainer";

export default async function ZoomSession({
  params,
}: {
  params: { slug: string };
}) {
  const jwt = await getData(params.slug);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <VideoCallContainer slug={params.slug} jwt={jwt} />
      <Script src="/coi-serviceworker.js" strategy="beforeInteractive" />
    </main>
  );
}
