import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getUser } from "../logic/firebase";
import { userState } from "../recoil/atom";

export function useLoader() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [, setUser] = useRecoilState(userState);

  useEffect(() => {
    return getUser((authUser: User | null) => {
      if (authUser) {
        setUser(authUser.email);
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading };
}
