import styles from '@/styles/components/FriendBox.module.css';
import { UserContext } from '@/components/Layout';
import NotificationBadge from './NotificationBadge';
import { IChannel } from '@/interfaces';

interface Props {
    channel: IChannel;
    notSelected?: boolean;
    onClick?: () => any;
}

const ChannelBox = ({ channel, notSelected, onClick }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <div
                    className={`${styles.box} ${darkTheme ? styles.hoverEffectDark : styles.hoverEffectLight} ${notSelected ? null : styles.selected}`}
                    onClick={onClick}
                >
                    <p># {channel.name}</p>
                </div>
            )}
        </UserContext.Consumer>
    );
};

export default ChannelBox;
