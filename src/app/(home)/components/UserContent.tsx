import type { ServerUser } from "@/data/getServerUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// TODO: Add button to logout user

export default function UserContent({ user }: { user: ServerUser }) {
  return (
    <div className="flex items-center space-x-4 bg-zinc-700 p-4 rounded-lg">
      <Avatar className="rounded-full overflow-hidden">
        <AvatarImage
          src={user.photoURL}
          alt={user.displayName}
          height={60}
          width={60}
        />
        <AvatarFallback>
          {user.displayName
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{user.displayName}</p>
        <p className="text-sm text-zinc-400">{user.email}</p>
      </div>
    </div>
  );
}
