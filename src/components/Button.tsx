import styles from "@/styles/components/Button.module.css";
import { UserContext } from "@/components/Layout";

interface Props {
    dark: string;
    light: string;
    icon?: JSX.Element;
    text: string;
    type?: string;
    onClick: (e?: any) => void;
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
                        <label className={styles.label} style={{backgroundColor: (darkTheme ? dark : light)}}>
                            {icon}
                            <p>{text}</p>
                            <input type="file" id="avatar" name="avatar" accept="image/*" onChange={onClick} className={styles.input}/>
                        </label>
                    }
                </>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default Button;