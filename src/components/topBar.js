import "./styles/topBar.css"
import ProfileDropMenu from "./profileDropMenu";

function TopBar({title}) {
    return (
        <div className="topBar">
            <h1>{title}</h1>
            <ProfileDropMenu/>
        </div>
    );
}

export default TopBar;
