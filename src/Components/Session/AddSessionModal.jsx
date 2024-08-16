import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddSessionModal = ({ show, handleClose ,groupID}) => {

  const initialValues = {
    name: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'name must be at least 2 characters long')
      .required('name is required')
  });

  const handleSubmit = (values) => {
    const submitValues = { ...values };


    console.log(submitValues);
    axios.post(`https://registration-production-c3f5.up.railway.app/api/v2/sessions/${groupID}`, submitValues)
      .then(response => {
        console.log('session added successfully:', response.data);
        toast.success('session added successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding student:', error);
        toast.error('session cannot be added.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add session</Modal.Title>
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
                <Form.Label>session Name</Form.Label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
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

export default AddSessionModal;
