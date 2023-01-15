import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className="checkbox">
            <input type="checkbox" {...field} {...props} />
            {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Min 2 characters!")
          .required("Requires FIELD!"),
        email: Yup.string()
          .email("Not correct email adress")
          .required("Requires FIELD!"),
        terms: Yup.boolean()
          .required("Consent is reqired")
          .oneOf([true], "Consent is reqired"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Отправить пожертвование</h2>
        <MyTextInput
          label="Ваше имя"
          id="name"
          name="name"
          type="text"
          autoComplete="off"
        />
        <MyTextInput
          label="Ваша почта"
          id="email"
          name="email"
          type="email"
          autoComplete="off"
        />
        <label htmlFor="amount">Количество</label>
        <Field id="amount" name="amount" type="number" autoComplete="off" />
        <ErrorMessage component="div" className="error" name="amount" />
        <label htmlFor="currency">Валюта</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage component="div" className="error" name="currency" />
        <label htmlFor="text">Ваше сообщение</label>
        <Field id="text" name="text" as="textarea" />
        <ErrorMessage component="div" className="error" name="text" />
        <MyCheckbox name="terms">
          Соглашаетесь с политикой конфиденциальности?
        </MyCheckbox>
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;

// EXAMPLE WITH HOOK

// import { useFormik } from "formik";
// import * as Yup from "yup";

// const Form = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       amount: 0,
//       currency: "",
//       text: "",
//       terms: false,
//     },
//     validationSchema: Yup.object({
//       name: Yup.string()
//         .min(2, "Min 2 characters!")
//         .required("Requires FIELD!"),
//       email: Yup.string()
//         .email("Not correct email adress")
//         .required("Requires FIELD!"),
//       terms: Yup.boolean()
//         .required("Consent is reqired")
//         .oneOf([true], "Consent is reqired"),
//     }),
//     onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
//   });
//   return (
//     <form className="form" onSubmit={formik.handleSubmit}>
//       <h2>Отправить пожертвование</h2>
//       <label htmlFor="name">Ваше имя</label>
//       <input
//         id="name"
//         name="name"
//         type="text"
//         value={formik.values.name}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />
//       {formik.errors.name && formik.touched.name ? (
//         <div style={{ color: "red", "margin-top": 10 }}>
//           {formik.errors.name}
//         </div>
//       ) : null}
//       <label htmlFor="email">Ваша почта</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />
//       {formik.errors.email && formik.touched.email ? (
//         <div style={{ color: "red", "margin-top": 10 }}>
//           {formik.errors.email}
//         </div>
//       ) : null}
//       <label htmlFor="amount">Количество</label>
//       <input
//         id="amount"
//         name="amount"
//         type="number"
//         value={formik.values.amount}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />
//       <label htmlFor="currency">Валюта</label>
//       <select
//         id="currency"
//         name="currency"
//         value={formik.values.currency}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       >
//         <option value="">Выберите валюту</option>
//         <option value="USD">USD</option>
//         <option value="UAH">UAH</option>
//         <option value="RUB">RUB</option>
//       </select>
//       <label htmlFor="text">Ваше сообщение</label>
//       <textarea
//         id="text"
//         name="text"
//         value={formik.values.text}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//       />
//       <label className="checkbox">
//         <input
//           name="terms"
//           type="checkbox"
//           value={formik.values.terms}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         Соглашаетесь с политикой конфиденциальности?
//       </label>
//       {formik.errors.terms && formik.touched.terms ? (
//         <div style={{ color: "red", "margin-top": 10 }}>
//           {formik.errors.terms}
//         </div>
//       ) : null}
//       <button type="submit">Отправить</button>
//     </form>
//   );
// };

// export default Form;
