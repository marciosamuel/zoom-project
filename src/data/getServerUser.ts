import { cookies } from "next/headers";
import { type UserRecord, getAuth } from "firebase-admin/auth";
import { initFirebaseAdmin } from "@/lib/firebase/firebase-admin-config";

export interface ServerUser extends UserRecord {}
export const USER_TOKEN_KEY = "AUTH_USER_TOKEN";

initFirebaseAdmin();

export default async function getServerUser(): Promise<ServerUser | null> {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(USER_TOKEN_KEY);

  if (userToken?.value) {
    const auth = getAuth();
    try {
      const decodedToken = await auth.verifyIdToken(userToken.value);
      const user = await auth.getUser(decodedToken.uid);
      return user;
    } catch (error) {
      console.error("Error verifying user token", error);
      return null;
    }
  }

  return null;
}
