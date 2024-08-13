import { useAuthContext } from "@/context/auth-context";

const useLogout = () => {
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
      console.log(error);
    }
  };

  return { logout };
};

export default useLogout;
