import styles from "@/styles/components/TextInput.module.css";
import { UserContext } from "@/components/Layout";

interface Props {
    label: string;
    value: string;
    disabled?: boolean;
    placeholder?: string;
    password?: boolean;
    children?: JSX.Element;
    onChange?: (value: string) => any,
}

const TextInput = ({ label, value, disabled, placeholder, password, children, onChange }: Props) => {
    const changeHandler = !onChange ? undefined : (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <label className={`${styles.box} ${!disabled ? (darkTheme ? styles.darkEditable : styles.lightEditable) : ""}`}>
                    {label}
                    <input
                        disabled={disabled}
                        placeholder={placeholder}
                        type={password ? "password" : ""}
                        value={value}
                        className={styles.input}
                        onChange={changeHandler}
                        style={darkTheme ? { color: "white" } : { color: "black" }}
                    />
                    {children}              
                </label>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default TextInput;