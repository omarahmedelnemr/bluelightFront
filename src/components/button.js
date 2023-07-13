import "./styles/button.css"
function Button({text,onClickFunc}) {
  return (
    <div className="Button">
        <button onClick={onClickFunc}>{text}</button>
    </div>
  );
}

export default Button;
