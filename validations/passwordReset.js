import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Contraseña obligatoria.';
  }
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Confirmar contraseña obligatoria.';
  }
  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Las contraseñas no coinciden';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
