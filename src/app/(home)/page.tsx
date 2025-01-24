import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import getServerUser from "@/data/getServerUser";
import UserContent from "./components/UserContent";
import CreateMeetingButton from "./components/CreateMeetingButton";
import SendToAuthButton from "./components/SendToAuthButton";
import { Separator } from "@radix-ui/react-select";

export default async function HomePage() {
  const user = await getServerUser();

  return (
    <main className="bg-gradient-to-br from-zinc-900 to-zinc-700">
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md bg-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Bem vindo ao Conecta Mais
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              {user
                ? "Create or join a meeting to get started"
                : "Sign in to create a new meeting or join an existing one"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <>
                <UserContent user={user} />
                <CreateMeetingButton />
              </>
            ) : (
              <SendToAuthButton />
            )}

            <div className="relative">
              {/* <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-600" />
              </div> */}
              <Separator className="absolute inset-0" />
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-800 px-2 text-zinc-400">Or</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-zinc-400">
              Need help?{" "}
              <a href="#dummy" className="text-emerald-400 hover:underline">
                Contact support
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
