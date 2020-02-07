import React from "react";
import Layout from "../core/Layout";

const Signup = () => {
    const [values, setValues] = useState({
        usertype: '',
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    
    const SignUpFrom = () => (
       <div className="container col-md-8 offset-md-2">
            <form>
                <div className="form-group">
                    <label className="text-muted">UserType</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
    return (
        <Layout title="Signup" description="Signup to deal registration site">
            {SignUpFrom()}
        </Layout>
    );
};

export default Signup;