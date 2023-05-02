import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import styles from '@/styles/components/LogoutDialog.module.css';
import { useContext } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import api from '@/services/axiosConfig';
import { useState } from 'react';
import { UserContext } from '@/components/Layout';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordDialog = ({ open, setOpen }: Props) => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState<string>('');

    const sendReset = () => {
        api.post('/reset-password', {
            email: user.email
        }).then((resp) => {
            console.log(resp);
            close();
        });
    };

    const close = () => {
        setOpen(false);
        setEmail('');
    };

    return (
        <div>
            <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', fontWeight: 'bold', paddingBottom: 0 }}>
                    Change Password
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
                    <DialogContentText>A password reset email will be sent to the email associated with your account</DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
                    <a onClick={close} className={styles.cancel}>
                        Cancel
                    </a>
                    <a onClick={sendReset} className={styles.logout} style={{ marginLeft: 0 }}>
                        Reset Password
                    </a>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PasswordDialog;
