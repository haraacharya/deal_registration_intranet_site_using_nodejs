import React, {useState} from "react";
import Layout from "../core/Layout";
import {API} from "../config";
import {Link} from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        usertype: '',
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    
    const {usertype, name, email, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})            
    }
    
    // const signup = (usertype, name, email, password) => {
    const signup = user => {
        // console.log(usertype, name, email, password)
        return fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            // body: JSON.stringify(usertype, name, email, password )
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        });

    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ usertype, name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    usertype: '',
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const SignUpFrom = () => (
       <div className="container col-md-8 offset-md-2">
            <form>
                <div className="form-group">
                    <label className="text-muted">UserType</label>
                    <input onChange={handleChange('usertype')} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" />
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
        );
    
    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            New Account created. Please <Link to='/signin'>signin</Link>.
        </div>
    );
    return (
        <Layout title="Signup" description="Signup to deal registration site">
            {showError()}
            {showSuccess()}
            {SignUpFrom()}
            {JSON.stringify(values)}
        </Layout>
    );
};

export default Signup;