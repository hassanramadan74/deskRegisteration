import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const GroupModel = ({ show, handleClose }) => {

  const initialValues = {
    Name: ''
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required')
  });

  const handleSubmit = (values) => {
    const submitValues = { ...values };


    console.log(submitValues);
    axios.post('https://registration-production-c3f5.up.railway.app/api/v2/groups', submitValues)
      .then(response => {
        console.log('group added successfully:', response.data);
        toast.success('group added successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding student:', error);
        toast.error('group cannot be added.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add group</Modal.Title>
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
                <Form.Label>Group Name</Form.Label>
                <Field
                  name="Name"
                  type="text"
                  placeholder="Enter name"
                  className={`form-control ${touched.Name && errors.Name ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="Name" component="div" className="invalid-feedback" />
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

export default GroupModel;
