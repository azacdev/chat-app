import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();

  const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { username, password } = validatedFields.data;

    try {
      const res = await fetch(`api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return { login };
};

export default useLogin;
