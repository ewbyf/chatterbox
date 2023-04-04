import styles from "@/styles/components/Button.module.css";
import { UserContext } from "@/components/Layout";

interface Props {
    dark: string;
    light: string;
    icon?: JSX.Element;
    text: string;
    type?: string;
    onClick: () => any;
}

const Button = ({ dark, light, icon, text, type, onClick }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <>
                    {type != "input" &&
                    <div className={styles.button} style={{backgroundColor: (darkTheme ? dark : light)}} onClick={onClick}>
                        {icon}
                        <p>{text}</p>
                    </div>
                    }
                    {type === "input" &&
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={onClick}/>
                    }
                </>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default Button;