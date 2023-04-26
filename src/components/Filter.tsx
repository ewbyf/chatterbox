import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/components/Layout';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from '@/styles/components/Filter.module.css';
import Menu from '@mui/material/Menu';
import { IFriend } from '@/interfaces';
import api from '@/services/axiosConfig';

interface IProps {
    friendsList: IFriend[];
    setFriendsList: React.Dispatch<React.SetStateAction<IFriend[]>>;
    dropdownVal: string;
}

const Filter = ({ friendsList, setFriendsList, dropdownVal } : IProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [option, setOption] = useState<string>('alphabetical');
    const open = Boolean(anchorEl);

    const { user } = useContext(UserContext);

    const openMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (): void => {
        setAnchorEl(null);
    };

    const filter = (val: string) => {
        setOption(val);
        const token = localStorage.getItem('userToken');
        if (dropdownVal != 'blocked') {
            if (val == 'alphabetical') {
                api.get(`/friends?token=${user.token}&filter=USERNAME_ASC`)
                .then((resp) => {
                    if (dropdownVal == 'online') {
                        setFriendsList(resp.data.filter((friend: IFriend) => friend.status == 'ONLINE'));
                    }
                    else {
                        setFriendsList(resp.data);
                    }
                })
            }
            else if (val == 'reverse') {
                api.get(`/friends?token=${user.token}&filter=USERNAME_DESC`)
                .then((resp) => {
                    if (dropdownVal == 'online') {
                        setFriendsList(resp.data.filter((friend: IFriend) => friend.status == 'ONLINE'));
                    }
                    else {
                        setFriendsList(resp.data);
                    }
                })
            }
        }
    }

    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <div style={{ position: 'relative', height: '30px' }}>
                    <div onClick={openMenu}>
                        <FilterListIcon sx={{ color: 'gray', fontSize: '30px', cursor: 'pointer' }} />
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={closeMenu}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: darkTheme ? 'rgb(29, 29, 29)' : 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0
                                },
                                bgcolor: darkTheme ? 'rgb(29, 29, 29)' : '',
                                color: darkTheme ? 'lightgrey' : '',
                                width: '250px',
                                borderRadius: '20px',
                                padding: '10px 20px'
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
						<p style={{fontFamily: "MarkPro", fontSize: "18px"}}>SORT BY</p>
                        <RadioGroup defaultValue="alphabetical" value={option} onChange={(e) => filter(e.target.value)}>
                            <FormControlLabel
                                value="alphabetical"
                                control={
                                    <Radio
                                        sx={{
                                            color: 'gray',
                                            '&.Mui-checked': {
                                                color: '#ff5c5c'
                                            }
                                        }}
                                    />
                                }
                                label="Alphabetical (A-Z)"
                            />
                            <FormControlLabel
                                value="reverse"
                                control={
                                    <Radio
                                        sx={{
                                            color: 'gray',
                                            '&.Mui-checked': {
                                                color: '#ff5c5c'
                                            }
                                        }}
                                    />
                                }
                                label="Reverse (Z-A)"
                            />
                        </RadioGroup>
                    </Menu>
                </div>
            )}
        </UserContext.Consumer>
    );
};

export default Filter;
