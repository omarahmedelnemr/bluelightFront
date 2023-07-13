import "./styles/inputs.css"
function Input({type,label,ID}) {
  return (
    <div class="col-3 input-effect">
        <input class="effect-22" type={type} id = {ID} name ={label} placeholder=" "/>
        <label>{label}</label>
        <span class="focus-bg"></span>
    </div>
  );
}

export default Input;
