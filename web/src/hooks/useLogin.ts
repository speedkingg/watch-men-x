import { useToast } from "@chakra-ui/react";
import { UserCredential } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { HOME_ROUTE } from "../config/route";
import { login } from "../logic/firebase";
import { userState } from "../recoil/atom";

export function useLogin() {
  const toast = useToast();
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);
  const [mail, setMail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const changeMail = (e: any) => setMail(e.target.value);
  const changePass = (e: any) => setPass(e.target.value);

  const execLogin = (): void => {
    login(mail, pass)
      .then((userInfo: UserCredential) => {
        setUser(userInfo.user.email);
        toast({
          title: "success",
          description: "ログインしました。",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        navigate(`/${HOME_ROUTE}`);
      })
      .catch((e: any) => {
        console.log(e.message);
        toast({
          title: "Failed",
          description: "ログインに失敗しました。",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return { mail, pass, changeMail, changePass, execLogin };
}
