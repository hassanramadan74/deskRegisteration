import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateStudentModal = ({ show, handleClose, examGrade, singleStudent }) => {

  const initialValues = {
    lecture: examGrade.lecture || '',
    grade: examGrade.grade || ''
  };

  const validationSchema = Yup.object().shape({
    lecture: Yup.string().required('Lecture is required'),
    grade: Yup.string().required('Grade is required').min(0, 'Grade must be a positive number')
  });

  const handleSubmit = (values) => {
    axios.patch(`https://registration-80nq.onrender.com/api/v2/students/${singleStudent}/${examGrade._id}`, values)
      .then(response => {
        console.log('Grade updated successfully:', response.data);
        toast.success('Grade updated successfully!');
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
        <Modal.Title>Update Exam Grade</Modal.Title>
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
                <Form.Label>Lecture</Form.Label>
                <Field
                  name="lecture"
                  type="text"
                  placeholder="Enter lecture"
                  className={`form-control ${touched.lecture && errors.lecture ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lecture" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formgrade">
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
