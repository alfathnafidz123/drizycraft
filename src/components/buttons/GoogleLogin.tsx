import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const GoogleLoginButton = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => onSuccess(codeResponse),
    onError: (error) => toast('Login failed'),
  });
  return (
    <button onClick={() => loginGoogle()} className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#1A214C] px-6 py-2 font-semibold text-[#1A214C]'>
      <FcGoogle />
      <p>Login with Google</p>
    </button>
  )
}

export default GoogleLoginButton;