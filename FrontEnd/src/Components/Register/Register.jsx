import "./register.css";

const Register = () => {
    return (
        <section className="register-container">
            <div className="register-title"> Register </div>
            <form>
                <div className="box_login n1">
                    <label>EMAIL</label>
                    <input type="text" placeholder="Enter your email" />
                </div>
                <div className="box_login n1">
                    <label>USERNAME</label>
                    <input type="text" placeholder="Enter your username" />
                </div>
                <div className="box_login">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <button type="submit"> Create account </button>
            </form>
        </section>

    );
}

export default Register;