import styles from "@/styles/components/Header.module.css";
import { UserContext } from "@/components/Layout";
import useMediaQuery from '@mui/material/useMediaQuery';
import BackArrow from '@/components/BackArrow';

interface Props {
    children?: JSX.Element | string;
    back?: boolean;
    handler?: () => void;
    center?: boolean;
  }

const Header = ({ children, back, handler, center }: Props) => {
    const mobile = useMediaQuery('(max-width: 800px)');

    if (mobile) {
        return (
            <UserContext.Consumer>
            {({ darkTheme }) => (
                <div className={styles.header} style={{padding: (mobile ? "0 20px" : "0 100px"), borderColor: (darkTheme ? "#2E2E2E" : "#C9C9C9 "), backgroundColor: (darkTheme ? "#181818" : "white"), justifyContent: (center ? "center" : "")}}>
                    {mobile && back && <BackArrow handler={handler}/>}
                    {children}
                </div>
            )}
            </UserContext.Consumer>
        );
    }
    
    return null;
}
 
export default Header;