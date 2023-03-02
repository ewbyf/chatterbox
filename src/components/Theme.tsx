import styles from '@/styles/components/Theme.module.css'

interface Props {
    children: JSX.Element,
    theme: boolean
}

export default function Theme({ children, theme }: Props) {
    return (
        <div className={theme ? styles.dark : styles.light}>
            { children }
        </div>
    );
}