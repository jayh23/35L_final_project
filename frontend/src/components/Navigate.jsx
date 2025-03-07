import { useNavigate } from "react-router-dom";

export function Navigate(Component) {
    return (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}