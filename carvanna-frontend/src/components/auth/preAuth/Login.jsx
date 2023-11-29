import LoginForm from "../login/Login"
import "./Login.scss"

export default function Home({ setIsAuthenticated }) {

    return (
        <>
            <div className="page-content">
                <LoginForm setIsAuthenticated={setIsAuthenticated} />
            </div>
        </>
    )

}


