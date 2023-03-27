import { IoArrowBackOutline } from "react-icons/io5";

interface Props {
    handler?: () => void;
}

const BackArrow = ({ handler }: Props) => {
    return (
        <IoArrowBackOutline size={25} onClick={handler} color="gray"/>
    ); 
}
 
export default BackArrow;