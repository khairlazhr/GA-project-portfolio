import { Link, useResolvedPath, useMatch } from "react-router-dom"

function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
        <div>
            <Link
            style={{ borderBottom: match ? "2px solid #707070" : "none", color: match ? "#BBA14F" : "#fff"}}
            to={to}
            {...props}
            >
                {children}
            </Link>
        </div>
    );
}

export default CustomLink