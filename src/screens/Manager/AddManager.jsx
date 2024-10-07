import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const INITIAL_DATA = {
  name: "",
  email: "",
  pass: "",
  confirm_pass: "",
  category: { edit: false, delete: false, read: false },
  offer: { edit: false, delete: false, read: false },
  lead: { edit: false, delete: false, read: false },
  payment: { edit: false, delete: false, read: false },
  user: { edit: false, delete: false, read: false },
  notification: { edit: false, delete: false, read: false },
  banner: { edit: false, delete: false, read: false },
  sponsored_ad: { edit: false, delete: false, read: false },
};
const AddManager = () => {
  const [managerDetails, setManagerDetails] = useState(INITIAL_DATA);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let val = name.split(".");
    let category = val[0];
    let actualName = val[1];

    if (type === "checkbox") {
      setManagerDetails((prevDetails) => ({
        ...prevDetails,
        [category]: {
          ...prevDetails[category],
          [actualName]: checked,
        },
      }));
    } else {
      setManagerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (managerDetails.pass !== managerDetails.confirm_pass) {
      alert("Passwords don't match");

      return;
    }
    console.log(managerDetails);
    alert("Manager added successfully!");
    setManagerDetails(INITIAL_DATA);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Add Manager</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={managerDetails.name}
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
              value={managerDetails.email}
              onChange={handleChange}
              placeholder="Enter manager's email"
              required
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm={2}>
            Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="pass"
              name="pass"
              value={managerDetails.pass}
              onChange={handleChange}
              placeholder="Enter manager's password"
              required
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm={2}>
            Confirm Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="confirm_pass"
              name="confirm_pass"
              value={managerDetails.confirm_pass}
              onChange={handleChange}
              placeholder="Confirm manager's password"
              required
            />
          </Col>
        </Form.Group>
        {/* Access Rights */}
        <h4>Assign Access Rights:</h4>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Category Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="category.read"
                  checked={managerDetails.category.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="category.edit"
                  checked={managerDetails.category.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="category.delete"
                  checked={managerDetails.category.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Offer Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="offer.read"
                  checked={managerDetails.offer.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="offer.edit"
                  checked={managerDetails.offer.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="offer.delete"
                  checked={managerDetails.offer.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Lead Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="lead.read"
                  checked={managerDetails.lead.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="lead.edit"
                  checked={managerDetails.lead.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="lead.delete"
                  checked={managerDetails.lead.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Payment Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="payment.read"
                  checked={managerDetails.payment.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="payment.edit"
                  checked={managerDetails.payment.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="payment.delete"
                  checked={managerDetails.payment.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>User Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="user.read"
                  checked={managerDetails.user.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="user.edit"
                  checked={managerDetails.user.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="user.delete"
                  checked={managerDetails.user.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Notification Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="notification.read"
                  checked={managerDetails.notification.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="notification.edit"
                  checked={managerDetails.notification.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="notification.delete"
                  checked={managerDetails.notification.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Sponsored Ads Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="sponsored_ad.read"
                  checked={managerDetails.sponsored_ad.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="sponsored_ad.edit"
                  checked={managerDetails.sponsored_ad.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="sponsored_ad.delete"
                  checked={managerDetails.sponsored_ad.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDashboardAccess">
          <Col sm={{ span: 10, offset: 2 }}>
            <h5>Banner Access:</h5>
            <Row style={{ borderWidth: 1, borderStyle: "solid", padding: 5 }}>
              {/* First Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Read Access"
                  name="banner.read"
                  checked={managerDetails.banner.read}
                  onChange={handleChange}
                />
              </Col>
              {/* Second Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Edit Access"
                  name="banner.edit"
                  checked={managerDetails.banner.edit}
                  onChange={handleChange}
                />
              </Col>
              {/* Third Checkbox */}
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="Delete Access"
                  name="banner.delete"
                  checked={managerDetails.banner.delete}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        {/* Submit Button */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Add Manager
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddManager;
