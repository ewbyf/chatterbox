import styles from "@/styles/components/Button.module.css";
import { UserContext } from "@/components/Layout";

interface Props {
    dark: string;
    light: string;
    icon?: JSX.Element;
    text: string;
    onClick: () => any;
}

const Button = ({ dark, light, icon, text, onClick }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <div className={styles.button} style={{backgroundColor: (darkTheme ? dark : light)}} onClick={onClick}>
                    {icon}
                    <p>{text}</p>
                </div>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default Button;