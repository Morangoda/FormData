import { useState } from "react";

function parseForm(form) {
  const formData = new FormData(form);
  const password = formData.get("password");
  const email = formData.get("email");
  return { password, email };
}

function useValidate() {
  const [errors, setErrors] = useState({});

  const validate = ({ email, password }) => {
    const errors = {};

    if (email.length < 6) {
      errors.email = "Require minimum 6 chars";
    } else if (email.length > 250) {
      errors.email = "Might be less than 250 chars";
    } else if (email.indexOf("@") < 0) {
      errors.email = "Might contain @";
    }

    if (password.length < 6) {
      errors.password = "Require minimum 6 chars";
    } else if (password.length > 250) {
      errors.password = "Might be less than 250 chars";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { errors, validate };
}

export function FormDataExample() {
  const { errors, validate } = useValidate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = parseForm(event.target);

    if (validate(data)) {
      alert(JSON.stringify(data, undefined, 4));
    }
  }

  return (
    <div>
      <h1>Form Data Example</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" name="email" />
          {errors.email && (<span className="text-danger small">{errors.email}</span>)}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" name="password" />
          {errors.password && (<span className="text-danger small">{errors.password}</span>)}
        </div>
        <button className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
}
