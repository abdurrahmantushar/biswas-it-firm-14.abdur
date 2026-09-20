
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();

  return {
    user,
    isAdmin: user?.role === "admin",
  };
};

export default useAdmin;