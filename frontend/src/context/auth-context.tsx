// import { createContext, useContext, useState } from "react";

// interface AuthContextType {
//   authUser: string | null;
//   setAuthUser: (user: string | null) => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export const AuthContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [authUser, setAuthUser] = useState<string | null>(() => {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   });

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  authUser: string | null;
  setAuthUser: (user: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<string | null>(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
