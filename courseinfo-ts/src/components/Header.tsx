interface HeaderProps {
    text: string;
}

const Header = (props: HeaderProps): JSX.Element => {
    return (
        <h1>{props.text}</h1>
    );
};

export default Header;