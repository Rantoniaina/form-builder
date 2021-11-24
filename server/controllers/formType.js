const {
  ERROR_NO_FORM_TYPES,
  ERROR_TRANSACTION,
} = require('../constants/errors');
const { sendError, shouldAbort } = require('../utils/error');
const { pgConnect } = require('../utils/pool');

exports.getAllFormTypes = (res) => {
  pgConnect().connect((err, client, done) => {
    if (err) {
      done();
      sendError(
        'Error connecting to db : ',
        err.stack,
        500,
        ERROR_TRANSACTION,
        res
      );
    } else {
      client.query('BEGIN', (err) => {
        if (shouldAbort(err, res, client, done)) return;
        const queryText = 'SELECT id, name, entry_type FROM form_type';
        client.query(queryText, [], (err, response) => {
          if (shouldAbort(err, res, client, done)) return;
          if (response && response.rows) {
            done();
            res.status(200).send({ formTypes: response.rows });
          } else {
            done();
            sendError(
              'Form types not found',
              null,
              404,
              ERROR_NO_FORM_TYPES,
              res
            );
          }
        });
      });
    }
  });
};
