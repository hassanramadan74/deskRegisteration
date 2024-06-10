import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const updateGroupModal = ({ show, handleClose, group }) => {
  const initialValues = {
    Name: group.Name || ''
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required')
  });

  const handleSubmit = (values) => {
    axios.put(`https://registration-80nq.onrender.com/api/v2/groups/${group._id}`, values)
      .then(response => {
        toast.success('group updated successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error updating group:', error);
        toast.error('Could not update group.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update group</Modal.Title>
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

export default updateGroupModal;
