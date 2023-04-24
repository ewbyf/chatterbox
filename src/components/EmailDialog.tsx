import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Router from "next/router";
import styles from "@/styles/components/LogoutDialog.module.css";
import { SocketContext } from "../pages/_app";
import { useContext } from 'react';
import { UserContext } from "@/components/Layout";
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import api from '@/services/axiosConfig';
import { useState } from 'react';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordDialog = ({ open, setOpen }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {updateUser, user} = useContext(UserContext);

  const changeEmail = () => {
    if (email === confirmEmail && email != user.email && email) {
        const token = localStorage.getItem('userToken');
        api.patch(`/me`, { token, email })
        .then((resp) => {
            updateUser();
            close();
            setError(false);
        })
        .catch((err) => {
            setErrorMessage('Email is already in use');
            setError(true);
        })
    }
    else if (email !== confirmEmail) {
        setErrorMessage('Please make sure both emails match');
        setError(true);
    }
    else if (email != user.email) {
        setErrorMessage('Please make sure you enter a new email');
        setError(true);
    }
    else if (!email) {
        setErrorMessage('Please make sure you enter a valid email');
        setError(true);
    }
  }

  const close = () => {
    setOpen(false);
    setEmail('');
    setConfirmEmail('');
  }

  return (
      <div>
      <Dialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
          <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", fontWeight: "bold", paddingBottom: 0}}>
              Change Email
              {open ? (
                  <IconButton
                  aria-label="close"
                  onClick={() => setOpen(false)}
                  sx={{
                      marginLeft: "auto",
                      color: (theme) => theme.palette.grey[500],
                  }}
                  >
                  <CloseIcon />
                  </IconButton>
              ) : null}
          </DialogTitle>
        <DialogContent  sx={{ p: 2, margin: "10px 50px 20px 0px"}}>
            <DialogContentText>
            Please enter your new email address and confirm it
            </DialogContentText>
            {error && 
            <p style={{color: "red", fontSize: "15px", fontWeight: "bold", marginTop: "10px"}}>
               {errorMessage} 
            </p>}
          <TextField
            autoFocus
            margin="dense"
            label="New Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                    <TextField
            autoFocus
            margin="dense"
            label="Confirm Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </DialogContent>
        <Divider/>
        <DialogActions sx={{display: "flex", alignItems: "center", justifyContent: "center", p: 0}}>
          <a onClick={close} className={styles.cancel}>Cancel</a>
          <a onClick={changeEmail} className={styles.logout} style={{marginLeft: 0}}>Change Email</a>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
export default PasswordDialog;