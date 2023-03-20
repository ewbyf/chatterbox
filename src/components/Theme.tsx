import styles from "@/styles/components/Theme.module.css";
import { UserContext } from "@/components/Layout";

interface Props {
  children: JSX.Element;
}

export default function Theme({ children }: Props) {
  return (
    <UserContext.Consumer>
      {({ darkTheme }) => (
        <div className={darkTheme ? styles.dark : styles.light}>{children}</div>
      )}
    </UserContext.Consumer>
  );
}
