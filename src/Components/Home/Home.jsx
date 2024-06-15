import React, { useState } from "react";
import Style from "./Home.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import Notfound from "../Notfound/Notfound.jsx";
export default function Login() {
  // let navigate = useNavigate();
  // const [error, seterror] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // async function loginSubmit(values) {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.post(
  //       `http://localhost:8080/addStudents`,
  //       values
  //     );
  //     if (data.message === 'success') {
  //       toast.success('Successfully added!');
  //     }
  
  //     setIsLoading(false);
  //   } catch (err) {
  //     setIsLoading(false);
  //     seterror(err.response.data.message);
  //   }
  // }
  
  // let validationSchema = Yup.object({
  //   ID: Yup.string().required("ID is required")
  // });

  // let formik = useFormik({
  //   initialValues: {
  //     ID: ""
  //   },
  //   validationSchema,
  //   onSubmit: loginSubmit,
  // });

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
       <div className={`${Style.serviceHome} vh-100`}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className={`${Style.bgPrimaryMoza} ${Style.bar}  w-100 rounded-2 p-4`}>
                        <h1 className="text-light text-end mb-3">مستر/ محسن عطية</h1>
                        <h4 className="text-end text-white"> لا يقعدن أحدكم عن طلب الرزق ويقول: اللهم ارزقني، وقد علم أن السماء لا تمطر ذهباً ولا فضة </h4>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className={`${Style.romady} ${Style.partOne} w-100 rounded-1 d-flex flex-column justify-content-center align-items-center`}>
                      <h1 className="mb-3"> "Physics: Unveiling Nature's Secrets."</h1>
                        <p className={`${Style.poppinsRegular} mb-5`}>
                           This is the official website registration for mr.mohsen 
                        </p>
                        <Link className="btn btn-outline-success pe-3 fw-bolder" to={`/group`}> Register now<i className="fa-solid fa-arrow-right ps-2"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    </div> 

    </>
  );
}
