import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast"; // Uncomment if you want to add toast for error handling

type AuthUserType = {
    id: string;
    username: string;
    email: string;
    // Removed password field for security
};

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch user data");
                }
                
                setAuthUser(data);
            } catch (error: any) {
                console.error("Failed to fetch authenticated user:", error);
                // Optionally, show a toast notification here
                // toast.error("Failed to load user data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuthUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isLoading,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
