import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <CircularProgress sx={{color: '#ff5c5c', position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
    );
}
 
export default Loading;