const {
  ERROR_NO_FORM_DATA,
  ERROR_TRANSACTION,
  ERROR_NO_FORM,
} = require('../constants/errors');
const {
  formElementsHasError,
  shouldAbort,
  sendError,
} = require('../utils/error');
const { pgConnect } = require('../utils/pool');
const { isEmpty } = require('../utils/string');

const formElementInsertFn = (formId, formElements, client, res, done) => {
  const createFormElementQuery =
    'INSERT INTO form_element(id, for_id, ismandatory, title, options) VALUES($1, $2, $3, $4, $5) returning id';
  formElements.forEach((formElement) => {
    client.query(
      createFormElementQuery,
      [
        formElement.id,
        formId,
        formElement.ismandatory,
        formElement.title,
        formElement.options,
      ],
      (err, insertFormElementResponse) => {
        if (shouldAbort(err, res, client, done)) return;
        if (
          !insertFormElementResponse ||
          !insertFormElementResponse.rowCount ||
          insertFormElementResponse.rowCount === 0
        ) {
          sendError('Error : ', err, 500, ERROR_TRANSACTION, res);
        }
      }
    );
  });
};

const fromInsertFn = (
  userId,
  formElements,
  client,
  res,
  done,
  formTitle,
  formDesc
) => {
  const createFormQuery =
    'INSERT INTO form(for_id, title, description) VALUES($1, $2, $3) returning id';
  client.query(
    createFormQuery,
    [userId, formTitle, formDesc],
    (err, insertFormResponse) => {
      if (shouldAbort(err, res, client, done)) return;
      if (
        insertFormResponse &&
        insertFormResponse.rowCount &&
        insertFormResponse.rowCount > 0
      ) {
        formElementInsertFn(
          insertFormResponse.rows[0].id,
          formElements,
          client,
          res,
          done
        );
        client.query('COMMIT', (err) => {
          if (err) {
            sendError(
              'Error connecting to db : ',
              err,
              500,
              ERROR_TRANSACTION,
              res
            );
          }
          done();
          res.status(200).send({ success: insertFormResponse.rows[0].id });
        });
      } else {
        sendError('Error : ', err, 500, ERROR_TRANSACTION, res);
      }
    }
  );
};

exports.createForm = (req, res) => {
  if (req && req.body && req.body.form_info) {
    const username = req.body.form_info.form_user.name;
    const formTitle = req.body.form_info.form.title;
    const formDesc = req.body.form_info.form.description;
    const formElements = req.body.form_info.form_elements;
    if (
      isEmpty(username) ||
      isEmpty(formTitle) ||
      formElementsHasError(formElements)
    ) {
      res.status(401).send({ error: ERROR_NO_FORM_DATA });
    } else {
      pgConnect().connect((err, client, done) => {
        if (err) {
          done();
          sendError(
            'Error connecting to db : ',
            err,
            500,
            ERROR_TRANSACTION,
            res
          );
        } else {
          client.query('BEGIN', (err) => {
            if (shouldAbort(err, res, client, done)) return;

            const checkUserQuery = 'SELECT id fROM form_user WHERE name = $1';
            client.query(checkUserQuery, [username], (err, response) => {
              if (shouldAbort(err, res, client, done)) return;
              if (response && response.rowCount && response.rowCount > 0) {
                fromInsertFn(
                  response.rows[0].id,
                  formElements,
                  client,
                  res,
                  done,
                  formTitle,
                  formDesc
                );
              } else {
                const insertUserQuery =
                  'INSERT INTO form_user(name) VALUES($1) returning id';
                client.query(
                  insertUserQuery,
                  [username],
                  (err, insertResponse) => {
                    if (shouldAbort(err, res, client, done)) return;
                    if (
                      insertResponse &&
                      insertResponse.rowCount &&
                      insertResponse.rowCount > 0
                    ) {
                      fromInsertFn(
                        insertResponse.rows[0].id,
                        formElements,
                        client,
                        res,
                        done,
                        formTitle,
                        formDesc
                      );
                    } else {
                      sendError('Error : ', err, 500, ERROR_TRANSACTION, res);
                    }
                  }
                );
              }
            });
          });
        }
      });
    }
  } else {
    res.status(401).send({ error: ERROR_NO_FORM_DATA });
  }
};

exports.getForm = (req, res) => {
  if (req && req.params && req.params.id && !isEmpty(req.params.id)) {
    const formId = req.params.id;
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
          const queryText = 'SELECT * FROM form_details WHERE form_id = $1';
          client.query(queryText, [formId], (err, response) => {
            if (shouldAbort(err, res, client, done)) return;
            if (response && response.rowCount && response.rowCount > 0) {
              done();
              let result = {
                form_id: response.rows[0].form_id,
                form_title: response.rows[0].form_title,
                form_description: response.rows[0].form_description,
                username: response.rows[0].username,
                form_elements: response.rows.map((row) => ({
                  form_element_title: row.form_element_title,
                  form_element_options: row.form_element_options,
                  form_type_name: row.form_type_name,
                  form_type_entry_type: row.form_type_entry_type,
                  form_element_mandatory: row.form_element_mandatory,
                })),
              };
              res.status(200).send({ form_details: result });
            } else {
              done();
              sendError('Form not found', null, 404, ERROR_NO_FORM);
            }
          });
        });
      }
    });
  } else {
    res.status(401).send({ error: ERROR_NO_FORM_DATA });
  }
};
