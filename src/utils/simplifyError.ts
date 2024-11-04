const simplifyError = (errors: any) => {
  const errorsKeys = Object.keys(errors);
  const simplifiedErrors = [];
  for (const key of errorsKeys) {
    const error = errors[key]._errors && errors[key]._errors[0];
    console.log(key);
    if (error) simplifiedErrors.push(error);
  }
  return simplifiedErrors;
};

export default simplifyError;
