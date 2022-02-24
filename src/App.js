import "./App.css";
import { ControlledFormExample } from "./ControlledFormExample";

import { FormDataExample } from "./FormDataExample";

function App() {
  return (
    <div className="p-3" style={{ maxWidth: 600 }}>
      <FormDataExample />
      <hr className="my-5" />
      <ControlledFormExample />
    </div>
  );
}

export default App;
