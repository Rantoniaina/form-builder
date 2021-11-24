const { ERROR_TRANSACTION } = require('../constants/errors');

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
      error.stack,
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
