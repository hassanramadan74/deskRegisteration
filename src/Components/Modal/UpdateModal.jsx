import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateModal = ({ show, handleClose, student }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://registration-80nq.onrender.com/api/v2/groups')
      .then(response => {
        setGroups(response.data.groups);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, []);

  const initialValues = {
    Name: student.Name || '',
    phoneNumber: student.phoneNumber || '',
    guardianPhoneNumber: student.guardianPhoneNumber || '',
    description: student.description || '',
    group: student.group || '',
    price: student.price || '',
    books: student.books || ''
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
    price: Yup.number().optional(),
    books: Yup.number().optional()
  });

  const handleSubmit = (values) => {
    if (!values.books) {
      delete values.books;
    }
    axios.put(`https://registration-80nq.onrender.com/api/v2/students/${student._id}`, values)
      .then(response => {
        toast.success('Student updated successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error updating student:', error);
        toast.error('Could not update student.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
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
                  placeholder="Enter number of books"
                  className={`form-control ${touched.books && errors.books ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="books" component="div" className="invalid-feedback" />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateModal;
