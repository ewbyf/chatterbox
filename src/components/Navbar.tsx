import Image from 'next/image'

const Navbar = () => {
    return (
        <nav>
            <div className='logo'>
                <Image src="/logo.png" alt="logo" height={50} width={50}/>
            </div>
            <a>HOME</a>
            <a>DISCOVER</a>
            <a>FRIENDS</a>
            <a>MESSAGES</a>
        </nav>
    );
}
 
export default Navbar;