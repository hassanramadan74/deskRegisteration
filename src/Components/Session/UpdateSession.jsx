import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateSession = ({ show, handleClose, session, groupID }) => {
  const initialValues = {
    name: session?.name || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required')
  });

  const handleSubmit = (values) => {
    axios.put(`https://registration-80nq.onrender.com/api/v2/sessions/${groupID}/${session._id}`, values)
      .then(response => {
        toast.success('Session updated successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error updating session:', error);
        toast.error('Could not update session.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Session</Modal.Title>
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

export default UpdateSession;
