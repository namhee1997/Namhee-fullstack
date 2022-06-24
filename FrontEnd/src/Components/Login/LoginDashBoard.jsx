import "./login.css";
const LoginDashBoard = () => {
    return (
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" />
                <button type="submit"> Continue </button>
            </form>
        </section>
    );
}

export default LoginDashBoard;