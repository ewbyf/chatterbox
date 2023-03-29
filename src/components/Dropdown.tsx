import { UserContext } from "@/components/Layout";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    children: (string | JSX.Element)[];
    title: string;
    value: string;
    onChange: (event: SelectChangeEvent<any>) => any;
}

const Dropdown = ({ children, title, value, onChange }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <FormControl fullWidth>
                    <InputLabel id="dropdown-label" sx={{color: "gray", fontFamily: "MarkPro", '&.Mui-focused': {
                        color: "gray"
                    } }}>{title}</InputLabel>
                    <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={value}
                    label={title}
                    variant="outlined"
                    sx={{
                        color: darkTheme ? "white" : "black",
                        fontFamily: "Nunito",
                        fontWeight: "bold",
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray',
                        },
                        '&:hover': {
                            backgroundColor: darkTheme ? "#1d1d1d" : "#ececec",
                        },
                        '.MuiSvgIcon-root': {
                            fill: "#ff5c5c !important",
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                              bgcolor: darkTheme ? 'rgb(38, 38, 38)' : "lightgray",

                              '.MuiMenuItem-root': {
                                color: darkTheme ? "white" : "black",
                                fontFamily: "Nunito",
                                fontWeight: "bold",
                              },
                              '.MuiMenuItem-root:hover': {
                                backgroundColor: darkTheme ? "rgb(33, 33, 33)" : "#A9A9A9",
                              },
                              '.Mui-selected': {
                                backgroundColor: darkTheme ? "#191919 !important" : "#8B8B8B !important",
                              },
                            },
                          },
                    }}
                    onChange={onChange}
                    >
                        {children}
                    </Select>
                </FormControl>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default Dropdown;