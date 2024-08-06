import * as z from "zod";

import { SignupSchema } from "@/schemas";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";

const GetSignup = () => {
  const { setAuthUser } = useAuthContext();

  const signup = async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { name, username, password, confirmPassword, gender } =
      validatedFields.data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return { signup };
};

export default GetSignup;
