import { Badge } from '@mui/material';

interface Props {
    count: number;
    small?: boolean;
    rectangle?: boolean;
    children?: JSX.Element | string;
}

const NotificationBadge = ({ count, small, rectangle, children }: Props) => {
    if (small) {
        return (
            <Badge
                overlap={rectangle ? 'rectangular' : 'circular'}
                badgeContent={count}
                sx={{
                    '.MuiBadge-badge': {
                        backgroundColor: '#ff5c5c',
                        color: 'white',
                        fontSize: '10px',
                        height: '15px',
                        minWidth: '15px',
                        width: '15px',
                        right: rectangle ? '-5px' : '',
                        top: rectangle ? '3px' : ''
                    }
                }}
            >
                {children}
            </Badge>
        );
    }
    return (
        <Badge
            overlap={rectangle ? 'rectangular' : 'circular'}
            badgeContent={count}
            sx={{
                '.MuiBadge-badge': {
                    backgroundColor: '#ff5c5c',
                    color: 'white',
                    right: rectangle ? '-5px' : '',
                    top: rectangle ? '3px' : ''
                }
            }}
        >
            {children}
        </Badge>
    );
};

export default NotificationBadge;
