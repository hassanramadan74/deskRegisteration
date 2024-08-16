import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const ModalComponent = ({ show, handleClose }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://registration-production-c3f5.up.railway.app/api/v2/groups')
      .then(response => {
        console.log(response);
        setGroups(response.data.groups);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, []);

  const initialValues = {
    Name: '',
    phoneNumber: '',
    guardianPhoneNumber: '',
    description: '',
    group: '',
    price: '',
    books: '' // New field for the number of books
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
      .required('Phone number is required'),
    guardianPhoneNumber: Yup.string()
      .matches(/^\d{11}$/, 'Guardian phone number must be exactly 11 digits')
      .required('Guardian phone number is required'),
    description: Yup.string().optional(),
    group: Yup.string().required('Please select a group'),
    price: Yup.number().optional().min(0, 'Price must be a positive number'),
    books: Yup.number().optional().min(0, 'books must be a positive number')
  });

  const handleSubmit = (values) => {
    const submitValues = { ...values };

    if (!submitValues.price) {
      delete submitValues.price;
    }
    if (!submitValues.description) {
      delete submitValues.description;
    }
    if (!submitValues.books) {
      delete submitValues.books;
    }
    console.log(submitValues);
    axios.post('https://registration-production-c3f5.up.railway.app/api/v2/students', submitValues)
      .then(response => {
        console.log('Student added successfully:', response.data);
        toast.success('Student added successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding student:', error);
        toast.error('Student cannot be added.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Field
                  name="Name"
                  type="text"
                  placeholder="Enter name"
                  className={`form-control ${touched.Name && errors.Name ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="Name" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter phone number"
                  className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGuardianPhoneNumber">
                <Form.Label>Guardian Phone Number</Form.Label>
                <Field
                  name="guardianPhoneNumber"
                  type="text"
                  placeholder="Enter guardian phone number"
                  className={`form-control ${touched.guardianPhoneNumber && errors.guardianPhoneNumber ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="guardianPhoneNumber" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="description" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroup">
                <Form.Label>Group</Form.Label>
                <Field
                  name="group"
                  as="select"
                  className={`form-control ${touched.group && errors.group ? 'is-invalid' : ''}`}
                >
                  <option value="">Select a group</option>
                  {groups.map(group => (
                    <option key={group._id} value={group._id}>
                      {group.Name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="group" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Field
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  className={`form-control ${touched.price && errors.price ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="price" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBooks">
                <Form.Label>Books</Form.Label>
                <Field
                  name="books"
                  type="number"
                  placeholder="Enter price of books"
                  className={`form-control ${touched.books && errors.books ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="books" component="div" className="invalid-feedback" />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
