import './styles/login.css'
import './styles/inputs.css'
import image from '../content/44.jpg'
function Login() {
  return (
    <div id = "loginContainer" className="login">\
        <div id='loginPageOpacity'></div>

        <div id='loginFormContainer'>
            <div id='formOpacity'></div>
            {/* <div id='formWithWave'> */}

              <svg viewBox="0 0 200 500" id='formWavyEffect'>
                  <path d="M -2,0 50,0 C 100,150 -100,359 100,500 L 00,500 L 0,1" fill='white' stroke="white"></path>
              </svg>
              <div id='mainLoginForm'>
                <div>
                    <h1>Welcome To Ejust School</h1>
                    <p>Login To Your Account</p>
                </div>
                <div>

                  <div class="col-3 input-effect">
                      <input class="effect-22" type="text" id = "loginEmail" name ="email" placeholder=" "/>
                      <label>Email</label>
                      <span class="focus-bg"></span>
                  </div>
                  <div class="col-3 input-effect">
                      <input class="effect-22" type="password" id = "loginPassword" name ="password" placeholder=" "/>
                      <label>Password</label>
                      <span class="focus-bg"></span>
                  </div>
                </div>

                <button>Login</button>
              </div>
            {/* </div> */}
        </div>
    </div>
  );
}

export default Login;
