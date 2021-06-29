import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

// 利用meta.error來顯示錯誤訊息
const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

// <Field>的name要跟error的property一樣才可以有error handling
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

// with redux-form
// no need to specify event.preventDefault() with form anymore
const StreamForm = (props) => {
  const onSubmit = (formValues) => {
    console.log('execute the code in StreamForm');
    props.onSubmit(formValues);
  };

  return (
    <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
