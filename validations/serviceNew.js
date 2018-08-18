import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Titulo obligatorio.';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description obligatoria.';
  }
  if (data.category_id === 0) {
    errors.category_id = 'Tipo de servicio obligatorio.';
  }
  if (data.sub_category_id === 0) {
    errors.sub_category_id = 'Categoría obligatoria.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
