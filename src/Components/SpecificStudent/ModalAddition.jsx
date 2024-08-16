import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const ModalComponent = ({ show, handleClose, studentID }) => {
  const [loading, setLoading] = useState(true);

  const initialValues = {
    assignment: '',
    grade: ''
  };

  const validationSchema = Yup.object().shape({
    assignment: Yup.string().required('Assignment is required'),
    grade: Yup.number().required('Grade is required').min(0, 'Grade must be a positive number')
  });

  const handleSubmit = (values) => {
    const submitValues = {
      assignment: values.assignment,
      grade: values.grade
    };

    axios.post(`https://registration-production-c3f5.up.railway.app/api/v2/students/${studentID}/homeWork`, submitValues)
      .then(response => {
        console.log('Homework added successfully:', response.data);
        toast.success('Homework added successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding homework:', error);
        toast.error('Homework cannot be added.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Homework</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <Form.Group className="mb-3" controlId="formAssignment">
                <Form.Label>Assignment</Form.Label>
                <Field
                  name="assignment"
                  type="text"
                  placeholder="Enter assignment"
                  className={`form-control ${touched.assignment && errors.assignment ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="assignment" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGrade">
                <Form.Label>Grade</Form.Label>
                <Field
                  name="grade"
                  type="number"
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

export default ModalComponent;
