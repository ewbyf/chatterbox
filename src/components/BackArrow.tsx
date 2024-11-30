import { IoArrowBackOutline } from 'react-icons/io5';
import styles from '@/styles/components/BackArrow.module.css';
// Ready for Testing: [sfbjrwbh] Create backarrow component

interface Props {
    handler?: () => void;
}

const BackArrow = ({ handler }: Props) => {
    return <IoArrowBackOutline size={25} onClick={handler} color="gray" className={styles.back} />;
};

export default BackArrow;
