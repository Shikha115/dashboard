import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

const AddManager = ({ managerDetails, handleChange }) => {
  return (
    <form action="#" className="row gy-2">
      <div className="col-12 col-md-6">
        <label className="form-label">Name:</label>
        
          <input
            className="form-control"
            type="text"
            name="name"
            value={managerDetails?.name}
            onChange={handleChange}
            placeholder="Enter manager's name"
            required
          />
      </div>
      {/* Email Field */}
      <div className="col-12 col-md-6">
        <label className="form-label">Email:</label>
        
          <input
            className="form-control"
            type="email"
            name="email"
            value={managerDetails?.email}
            onChange={handleChange}
            placeholder="Enter manager's email"
            required
          />
      </div>
      {/* Phone Number Field */}
      <div className="col-12 col-md-6">
        <label className="form-label">Phone Number:</label>
        
          <input
            className="form-control"
            type="phone"
            name="phone"
            maxLength={10}
            value={managerDetails?.phone}
            onChange={handleChange}
            placeholder="Enter manager's phone number"
            required
          />
      </div>
      {/* Password Field */}
      <div className="col-12 col-md-6">
        <label className="form-label">Password:</label>
        
          <input
            className="form-control"
            type="password"
            name="pass"
            value={managerDetails?.pass}
            onChange={handleChange}
            placeholder="Enter manager's password"
            required
          />
      </div>
      {/* Confirm Password Field */}
      <div className="col-12">
        <label className="form-label">Confirm Password:</label>
        
          <input
            className="form-control"
            type="password"
            name="confirm_pass"
            value={managerDetails?.confirm_pass}
            onChange={handleChange}
            placeholder="Confirm manager's password"
            required
          />
      </div>

      {/* Access Rights */}
      <div className="col-12">
      <h4 className="">Assign Access Rights:</h4>
      </div>

      {/* Access Categories */}
      {Object?.keys(managerDetails?.access)?.map((section) => (
        <div
          className="col-12"
          key={section}
          // controlId={`form${section}`}
        >
            <h5>
              {section.charAt(0).toUpperCase() + section.slice(1)} Access:
            </h5>
            <div className="form-control d-flex gap-4" style={{width:'max-content',borderColor:'#ffffff40'}}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name={`${section}.read`}
                  checked={managerDetails?.access?.[section]?.read}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name={`${section}.edit`}
                  checked={managerDetails?.access?.[section]?.edit}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name={`${section}.delete`}
                  checked={managerDetails?.access?.[section]?.delete}
                  onChange={handleChange}
                />
            </div>
        </div>
      ))}
    </form>
  );
};

export default AddManager;
