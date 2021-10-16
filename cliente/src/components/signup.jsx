import { withFormik, Field, ErrorMessage, Form } from 'formik';
import axios from "axios";
import Swal from 'sweetalert2';
import urlConfig from '../settings/settings';

function Signup(props) {

    const {
        isSubmitting,
        isValid
    } = props;

    return (
        <Form>
            <h1>Sign up</h1>

            <div className="input-div">
                <div>
                    <Field className="input" name="email" type="email" placeholder="email" />
                    <ErrorMessage ErrorMessage name="email">
                        {message => <div className="text-danger">{message}</div>}
                    </ErrorMessage>
                </div>
            </div>

            <div className="input-div">
                <div>
                    <Field className="input" name="pass" type="password" placeholder="Password" />
                    <ErrorMessage ErrorMessage name="pass">
                        {message => <div className="text-danger">{message}</div>}
                    </ErrorMessage>
                </div>
            </div>

            <button
                type="submit"
                className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                disabled={isSubmitting || !isValid}>
                Registrarse
            </button>
        </Form>
    )
};

export default withFormik({
    mapPropsToValues(props) {
        return {
            email: '',
            pass: ''
        };
    },

    validate(values) {
        const errors = {};

        if (!values.pass) {
            errors.pass = 'Password is required';
        } else if (values.pass.length < 3) {
            errors.pass = 'Password must be at least 4 characters'
        }

        if (!values.email) {
            errors.email = 'Email is required';
        }

        return errors;
    },

    async handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        const user = await axios.post(`http://${urlConfig}:5001/api/signup`, values);
        console.log(user);

        if (user.data.code === 'ER_DUP_ENTRY') {
            Swal.fire({
                title: 'Error',
                text: 'El correo ingresado ya se encuentra registrado.',
                icon: 'warning'
            });
        } else {
            Swal.fire({
                title: 'Guardado',
                text: 'Usuario creado correctamente',
                icon: 'success'
            })
        };
    }
})(Signup);