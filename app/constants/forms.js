// Configuración de formularios
export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password'
}

// Configuración específica del formulario de contador
export const CONTADOR_FORM_CONFIG = {
  fields: {
    nombre: {
      type: FORM_FIELD_TYPES.TEXT,
      label: 'Nombre',
      placeholder: 'Ingrese el nombre del contador (3-20 caracteres)',
      required: true,
      minlength: 3,
      maxlength: 20
    },
    cantidad: {
      type: FORM_FIELD_TYPES.NUMBER,
      label: 'Cantidad',
      placeholder: 'Ingrese la cantidad inicial (0-20)',
      required: true,
      min: 0,
      max: 20
    }
  },
  submitText: 'Guardar',
  loadingText: 'Guardando...'
}

