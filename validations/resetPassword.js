import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Debes indicar un correo electrónico.';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Introduce un correo electronico valido.';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
