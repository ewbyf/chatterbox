import styles from "@/styles/components/SearchBar.module.css";
import { UserContext } from "@/components/Layout";
import SearchIcon from '@mui/icons-material/SearchRounded';

interface Props {
    value: string;
    placeholder?: string;
    onChange: (value: string) => any,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => any,
}

const SearchBar = ({ value, placeholder, onChange, onKeyDown }: Props) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <label className={`${styles.box} ${darkTheme ? styles.darkEditable : styles.lightEditable}`}>
                    <SearchIcon />
                    <input
                        maxLength={12}
                        placeholder={placeholder}
                        value={value}
                        className={styles.input}
                        onChange={changeHandler}
                        onKeyDown={onKeyDown ? (e) => onKeyDown(e) : undefined}
                        style={darkTheme ? { color: "white" } : { color: "black" }}
                    />           
                </label>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default SearchBar;