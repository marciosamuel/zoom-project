import { auth, recaptchaVerifier } from "@/lib/firebase/firebase-config";
import { useAuthStore } from "@/store/auth-store";
import { type ConfirmationResult, signInWithPhoneNumber } from "firebase/auth";

export const signInWithPhone = async (
  phoneNumber: string,
  containerId: string
) => {
  try {
    const verifier = recaptchaVerifier(containerId);
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      verifier
    );
    return confirmationResult; // Needed to confirm the code later
  } catch (error) {
    console.error("Erro ao fazer login com telefone:", error);
  }
};

export const confirmPhoneCode = async (
  confirmationResult: ConfirmationResult,
  code: string
) => {
  try {
    const result = await confirmationResult.confirm(code);
    useAuthStore.getState().setUser(result.user);
  } catch (error) {
    console.error("Erro ao confirmar código de verificação:", error);
  }
};
