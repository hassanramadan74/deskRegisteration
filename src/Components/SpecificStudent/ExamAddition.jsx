import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const ExamAddition = ({ show, handleClose, studentID }) => {
  const [loading, setLoading] = useState(true);

  const initialValues = {
    lecture: '',
    grade: ''
  };

  const validationSchema = Yup.object().shape({
    lecture: Yup.string().required('lecture is required'),
    grade: Yup.number().required('Grade is required').min(0, 'Grade must be a positive number')
  });

  const handleSubmit = (values) => {
    const submitValues = {
      lecture: values.lecture,
      grade: values.grade
    };

    axios.post(`https://registration-production-c3f5.up.railway.app/api/v2/students/${studentID}/examGrades`, submitValues)
      .then(response => {
        console.log('exam added successfully:', response.data);
        toast.success('exam added successfully!');
        handleClose();
      })
      .catch(error => {
        console.error('Error adding exam:', error);
        toast.error('exam cannot be added.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add exam</Modal.Title>
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
                <Form.Label>lecture</Form.Label>
                <Field
                  name="lecture"
                  type="text"
                  placeholder="Enter lecture"
                  className={`form-control ${touched.lecture && errors.lecture ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lecture" component="div" className="invalid-feedback" />
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

export default ExamAddition;
