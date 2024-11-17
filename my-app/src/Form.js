import "./Form.css";

function Form() {
  return (
    <div className="Form">
      <div className="Form-Purple-container"></div>
      <div className="EmployeeID-container">
        <h1 className="EmployeeID-text">Employee ID</h1>
      </div>
      {/*  Text Field 1 */}
      <div className="Custom-InputContainer">
        <input
          type="text"
          id="employee-id"
          name="employee-id"
          className="Custom-TextField"
          placeholder="Enter your 4 digit ID"
        />
      </div>
      <div className="Well-container">
        <h1 className="Well-text">Well Name</h1>
      </div>
      {/* Text Field 2 */}
      <div className="Well-InputContainer">
        <input
          type="text"
          id="well-name"
          name="well-id"
          className="Custom-TextField"
          placeholder="Enter the well name"
        />
      </div>
      <div className="Upload-container">
        <h1 className="Upload-text">Well Name</h1>
      </div>
      <div className="Form-upload-box"></div>
    </div>
  );
}

export default Form;
