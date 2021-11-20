import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext({
  user: {
    id: null,
    username: null,
    avatar: null,
    banner: null,
    banner_color: null,
    discriminator: null,
    premium_type: null,
    locale: null,
    verified: null,
  },
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("api/user");
      const resData = await res.json();
      if (resData.code != 0) {
        setUser(resData);
      }
      setLoading(false)
    };
    getUser();
  }, []);

  const signIn = () => {
    const stateGenerator = (length) => {
      var state = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++) {
        state += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return state;
    };

    const getState = stateGenerator(50);
    cookies.set("state", getState);
    router.push(
      `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=${process.env.SCOPE}&state=${getState}`
    );
  };

  const signOut = () => {
    setUser(null);
    fetch("api/logout");
    router.push("/")
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
