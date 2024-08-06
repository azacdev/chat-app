import { toast } from "sonner";

import { useAuthContext } from "@/context/auth-context";

const GetLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error();
      }

      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return { logout };
};

export default GetLogout;
