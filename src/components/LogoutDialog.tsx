import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Router from 'next/router';
import styles from '@/styles/components/LogoutDialog.module.css';
import { SocketContext } from '../pages/_app';
import { useContext } from 'react';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutDialog = ({ open, setOpen }: Props) => {
    const { closeSocket } = useContext(SocketContext);

    const logout = () => {
        closeSocket();
        localStorage.removeItem('userToken');
        Router.push({
            pathname: '/login'
        });
    };

    return (
        <div>
            <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', fontWeight: 'bold', paddingBottom: 0 }}>
                    Logout
                    {open ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpen(false)}
                            sx={{
                                marginLeft: 'auto',
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent sx={{ p: 2, margin: '10px 50px 20px 0px' }}>
                    <p>Are you sure you want to logout?</p>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
                    <a onClick={() => setOpen(false)} className={styles.cancel}>
                        Cancel
                    </a>
                    <a onClick={() => logout()} className={styles.logout} style={{ marginLeft: 0 }}>
                        Logout
                    </a>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LogoutDialog;
