import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

const AddManager = ({ managerDetails, handleChange }) => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Add Manager</h2>
      <Form>
        {/* Name Field */}
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={managerDetails?.name}
              onChange={handleChange}
              placeholder="Enter manager's name"
              required
            />
          </Col>
        </Form.Group>
        {/* Email Field */}
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={managerDetails?.email}
              onChange={handleChange}
              placeholder="Enter manager's email"
              required
            />
          </Col>
        </Form.Group>
        {/* Phone Number Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPhone">
          <Form.Label column sm={2}>
            Phone Number:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="phone"
              name="phone"
              maxLength={10}
              value={managerDetails?.phone}
              onChange={handleChange}
              placeholder="Enter manager's phone number"
              required
            />
          </Col>
        </Form.Group>
        {/* Password Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPass">
          <Form.Label column sm={2}>
            Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="pass"
              value={managerDetails?.pass}
              onChange={handleChange}
              placeholder="Enter manager's password"
              required
            />
          </Col>
        </Form.Group>
        {/* Confirm Password Field */}
        <Form.Group as={Row} className="mb-3" controlId="formConfirmPass">
          <Form.Label column sm={2}>
            Confirm Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="confirm_pass"
              value={managerDetails?.confirm_pass}
              onChange={handleChange}
              placeholder="Confirm manager's password"
              required
            />
          </Col>
        </Form.Group>

        {/* Access Rights */}
        <h4>Assign Access Rights:</h4>

        {/* Access Categories */}
        {Object?.keys(managerDetails?.access)?.map((section) => (
          <Form.Group
            as={Row}
            className="mb-3"
            key={section}
            controlId={`form${section}`}
          >
            <Col sm={{ span: 10, offset: 2 }}>
              <h5>
                {section.charAt(0).toUpperCase() + section.slice(1)} Access:
              </h5>
              <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
                <Col lg={4}>
                  <Form.Check
                    type="checkbox"
                    label="Read Access"
                    name={`${section}.read`}
                    checked={managerDetails?.access?.[section]?.read}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="checkbox"
                    label="Edit Access"
                    name={`${section}.edit`}
                    checked={managerDetails?.access?.[section]?.edit}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={4}>
                  <Form.Check
                    type="checkbox"
                    label="Delete Access"
                    name={`${section}.delete`}
                    checked={managerDetails?.access?.[section]?.delete}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>
        ))}
      </Form>
    </Container>
  );
};

export default AddManager;
