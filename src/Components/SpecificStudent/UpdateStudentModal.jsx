import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateStudentModal = ({ show, handleClose, student ,singleStudent}) => {

  const initialValues = {
    lecture: student.lecture || '',
    grade: student.grade || ''
  };

  const validationSchema = Yup.object().shape({
    lecture: Yup.string().optional(),
    grade: Yup.string().optional()
  });

  const handleSubmit = (values) => {
    axios.patch(`https://registration-80nq.onrender.com/api/v2/students/${singleStudent}/${student._id}`, values)
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
              <Form.Group className="mb-3" controlId="formlecture">
                <Form.Label>lecture</Form.Label>
                <Field
                  name="lecture"
                  type="text"
                  placeholder="Enter name"
                  className={`form-control ${touched.lecture && errors.lecture ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lecture" component="div" className="invalid-feedback" />
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
