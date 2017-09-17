import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Debes indicar un correo electrónico.';
  }

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = 'Introduce un correo electronico valido.';
  // }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Contraseña obligatoria.';
  }
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'Nombre obligatorio.';
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'Apellido obligatorio.';
  }
  // if (Validator.isEmpty(data.passwordConfirmation)) {
  //   errors.passwordConfirmation = 'This field is required';
  // }
  // if (!Validator.equals(data.password, data.passwordConfirmation)) {
  //   errors.passwordConfirmation = 'Passwords must match';
  // }
  // if (Validator.isEmpty(data.timezone)) {
  //   errors.timezone = 'This field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
