import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    email: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
    message: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: {
          pattern: /[A-Za-zÁÉÍÓÚñáéíóúÑ]{2}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']/,
        },
        message: 'Introduzca un mensaje para el propietario',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);