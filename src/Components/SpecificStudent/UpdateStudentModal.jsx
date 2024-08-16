import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateStudentModal = ({ show, handleClose, homework ,singleStudent}) => {

  const initialValues = {
    assignment: homework.assignment || '',
    grade: homework.grade || ''
  };

  const validationSchema = Yup.object().shape({
    assignment: Yup.string().optional(),
    grade: Yup.string().optional()
  });

  const handleSubmit = (values) => {
    axios.patch(`https://registration-production-c3f5.up.railway.app/api/v2/students/${singleStudent}/${homework._id}/homeWork`, values)
      .then(response => {
        toast.success('grade updated successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error updating grade:', error);
        toast.error('Could not update grade.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update homework</Modal.Title>
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
              <Form.Group className="mb-3" controlId="formAssignment">
                <Form.Label>assignment</Form.Label>
                <Field
                  name="assignment"
                  type="text"
                  placeholder="Enter name"
                  className={`form-control ${touched.assignment && errors.assignment ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="assignment" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formgrade">
                <Form.Label>grade</Form.Label>
                <Field
                  name="grade"
                  type="text"
                  placeholder="Enter phone number"
                  className={`form-control ${touched.grade && errors.grade ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="grade" component="div" className="invalid-feedback" />
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

export default UpdateStudentModal;
