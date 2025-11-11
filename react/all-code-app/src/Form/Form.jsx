import React, {useRef} from "react";
import "./Form.css";

function Form({ formData, onChange, onSubmit, onClear }) {
    const usernameRef = useRef(null);

    const handleClearClick = () => {
        onClear(); 
        usernameRef.current?.focus(); 
    };
    return (
        <div className="form-card">
            <h2 className="form-title">User Registration</h2>

            <form onSubmit={onSubmit} className="form-fields">
                <strong>Username :</strong>
                <input
                    ref={usernameRef}
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={onChange}
                    className="form-input"
                    required
                />
                <strong>Email :</strong>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={onChange}
                    className="form-input"
                    required
                />
                <strong>Password :</strong>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={onChange}
                    className="form-input"
                    required
                />

                <div className="form-buttons">
                    <button type="submit" className="btn btn-submit">
                        Submit
                    </button>
                    <button type="button" className="btn btn-clear" onClick={handleClearClick}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
