import { Badge } from '@mui/material';

interface Props {
    count: number;
    children?: JSX.Element;
}

const NotificationBadge = ({ count, children }: Props) => {
    return (
        <Badge
            overlap="circular"
            badgeContent={count}
            sx={{
                '.MuiBadge-badge': {
                    backgroundColor: '#ff5c5c',
                    color: 'white'
                }
            }}
        >
            {children}
        </Badge>
    );
};

export default NotificationBadge;
