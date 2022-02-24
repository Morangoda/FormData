import { useCallback, useState } from "react";

const validationSchema = {
  email: (value) => {
    if (value.length < 6) {
      return "Might be min 6 chars";
    }

    if (value.length > 250) {
      return "Might be less than 250 chars";
    }

    if (value.indexOf("@") < 0) {
      return "Might contain @";
    }
  },
  password: (value) => {
    if (value.length < 6) {
      return "Might be min 6 chars";
    }

    if (value.length > 250) {
      return "Might be less than 250 chars";
    }
  },
};

function useFormState() {
  const [value, setValue] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(
    (event) => {
      const fieldName = [event.target.name];
      const fieldValue = event.target.value;

      setValue({ ...value, [fieldName]: fieldValue });
      setErrors({
        ...errors,
        [fieldName]: validationSchema[fieldName](fieldValue),
      });
    },
    [value, setValue]
  );

  const invalid = Object.values(errors).filter(x => !!x).length > 0;

  return { value, errors, invalid, onChange: handleChange };
}

export function ControlledFormExample() {
  const { value, invalid, errors, onChange } = useFormState();

  return (
    <div className="mt-4">
      <h1>Controlled form example</h1>
      <form noValidate>
        <div className="form-group">
          <label>Email</label>
          <input
            value={value.email}
            onChange={onChange}
            type="email"
            name="email"
            className="form-control"
          />
          {errors.email && (
            <span className="text-danger small">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={value.password}
            onChange={onChange}
            type="password"
            name="password"
            className="form-control"
          />
          {errors.password && (
            <span className="text-danger small">{errors.password}</span>
          )}
        </div>
        <pre className="p-3 bg-light">
          {JSON.stringify({ value, errors }, undefined, 4)}
        </pre>
        <button disabled={invalid} className="mt-2 btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
}
