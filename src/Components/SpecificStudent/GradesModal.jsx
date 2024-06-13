import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const GradesModal = ({ show, handleClose,id }) => {

  const initialValues = {
    lecture: '',
    grade: '',
  };

  const validationSchema = Yup.object().shape({
    lecture: Yup.string().required('lecture is required'),
    grade: Yup.string().required('Phone number is required')
  });

  const handleSubmit = (values) => {
    const submitValues = { ...values };

    if (!submitValues.price) {
      delete submitValues.price;
    }

    console.log(submitValues);
    axios.post(`https://registration-80nq.onrender.com/api/v2/students/${id}/examGrades`, submitValues)
      .then(response => {
        console.log('grade added successfully:', response.data);
        toast.success('grade added successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding student:', error);
        toast.error('grade cannot be added.');
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
              <Form.Group className="mb-3" controlId="formlecture">
                <Form.Label>lecture Name</Form.Label>
                <Field
                  name="lecture"
                  type="text"
                  placeholder="Enter lecture name"
                  className={`form-control ${touched.lecture && errors.lecture ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lecture" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formgrade">
                <Form.Label>grade</Form.Label>
                <Field
                  name="grade"
                  type="text"
                  placeholder="Enter grade"
                  className={`form-control ${touched.grade && errors.grade ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="grade" component="div" className="invalid-feedback" />
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

export default GradesModal;
