import styles from "@/styles/components/Theme.module.css";
import { UserContext } from "@/components/Layout";
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  noOverlap: boolean;
  children: JSX.Element;
}

export default function Theme({ noOverlap, children }: Props) {
  const mobile = useMediaQuery('(max-width: 800px)');

  return (
    <UserContext.Consumer>
      {({ darkTheme }) => (
        <div className={darkTheme ? styles.dark : styles.light} style={(mobile ? {paddingBottom: "75px", paddingTop: "80px"} : {paddingLeft: noOverlap ? "0px" : "80px"})}>{children}</div>
      )}
    </UserContext.Consumer>
  );
}
