import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <nav>
            <Link to="/showmasters">Show masters</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </nav>
    )
}