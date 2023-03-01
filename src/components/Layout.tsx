import Navbar from "./Navbar";

interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Navbar/>
            { children }
        </>
    );
}