const { ERROR_TRANSACTION } = require('../constants/errors');
const { isEmpty } = require('./string');

exports.sendError = (
  errorLabel,
  errorMessage,
  errorStatus,
  errorReturn,
  res
) => {
  if (errorLabel) {
    console.error(errorLabel);
  }
  if (errorMessage) {
    console.error(errorMessage.stack);
  }
  if (errorStatus && errorReturn && res) {
    res.status(errorStatus).send({ error: errorReturn });
  }
};

exports.shouldAbort = (error, res, client, done) => {
  if (error) {
    this.sendError(
      'Error in transaction : ',
      error,
      500,
      ERROR_TRANSACTION,
      res
    );
    client.query('ROLLBACK', (err) => {
      if (err) {
        this.sendError(
          'Error rolling back client : ',
          err.stack,
          500,
          ERROR_TRANSACTION,
          res
        );
      }
      done();
    });
  }
  return !!error;
};

exports.formElementsHasError = (formElements) => {
  let result = false;
  if (formElements === undefined || formElements.length === 0) {
    return true;
  } else {
    formElements.forEach((formElement) => {
      const id = formElement.id;
      const title = formElement.title;
      // TO-DO
      // Test if options is empty depending on id
      if (isEmpty(id) || isEmpty(title)) {
        result = true;
      }
    });
  }
  return result;
};
