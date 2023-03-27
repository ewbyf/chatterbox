import styles from "@/styles/components/Header.module.css";
import { UserContext } from "@/components/Layout";
import useMediaQuery from '@mui/material/useMediaQuery';
import BackArrow from '@/components/BackArrow';

interface Props {
    children?: JSX.Element | string;
    back?: boolean;
    handler?: () => void;
  }

const Header = ({ children, back, handler }: Props) => {
    const mobile = useMediaQuery('(max-width: 800px)');

    return (
        <UserContext.Consumer>
        {({ darkTheme }) => (
            <div className={styles.header} style={{paddingLeft: (mobile ? "20px" : "100px"), borderColor: (darkTheme ? "#2E2E2E" : "#C9C9C9 ")}}>
                {mobile && back && <BackArrow handler={handler}/>}
                {children}
            </div>
        )}
        </UserContext.Consumer>
    );
}
 
export default Header;