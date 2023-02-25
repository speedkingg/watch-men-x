import { useLoader } from "../hooks/useLoader";
import { ULoader } from "./utils/Uloader";

export function AuthLoader(props: { children: JSX.Element }): JSX.Element {
  const { isLoading } = useLoader();
  return <>{isLoading ? <ULoader /> : props.children}</>;
}
