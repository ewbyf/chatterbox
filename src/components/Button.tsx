import styles from "@/styles/components/Button.module.css";
import { UserContext } from "@/components/Layout";

interface Props {
    dark: string;
    light: string;
    icon?: JSX.Element;
    text: string;
    type?: string;
    submit?: boolean;
    onClick: (e?: any) => void;
}

const Button = ({ dark, light, icon, text, type, submit, onClick }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <>
                    {type != "input" && !submit &&
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
                    {submit &&
                        <button type="submit" className={styles.button} style={{backgroundColor: (darkTheme ? dark : light), outline: "none", border: "none", color: "white"}} onClick={onClick}>
                            {icon}
                            <p>{text}</p>
                        </button>
                    }
                </>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default Button;