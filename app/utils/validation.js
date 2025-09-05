import { z } from 'zod'

// Esquemas de validación reutilizables
export const contadorSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),
  cantidad: z
    .coerce.number()
    .min(0, 'La cantidad debe ser mayor o igual a 0')
    .max(20, 'La cantidad no puede ser mayor a 20')
})

// Utilidad para procesar errores de Zod
export function processZodErrors(error) {
  const errors = {}
  if (error.errors) {
    error.errors.forEach(err => {
      errors[err.path[0]] = err.message
    })
  }
  return errors
}

// Validador individual de campo
export function validateField(schema, fieldName, value) {
  try {
    // Para campos con coerce, necesitamos validar usando el esquema completo
    if (fieldName === 'cantidad') {
      const tempObject = { [fieldName]: value }
      schema.pick({ [fieldName]: true }).parse(tempObject)
    } else {
      const fieldSchema = schema.shape[fieldName]
      fieldSchema.parse(value)
    }
    return { isValid: true, error: null }
  } catch (error) {
    // El error siempre estará en la primera posición para validación individual
    let errorMessage = 'Campo no puede estar vacio'
    
    if (error.errors?.[0]?.message) {
      errorMessage = error.errors[0].message
    } else if (error.message) {
      // Si error.message es un string JSON, parsearlo
      try {
        const parsedErrors = JSON.parse(error.message)
        if (Array.isArray(parsedErrors) && parsedErrors[0]?.message) {
          errorMessage = parsedErrors[0].message
        }
      } catch {
        // Si no se puede parsear, usar el mensaje tal como está
        errorMessage = error.message
      }
    }
    
    return { 
      isValid: false, 
      error: errorMessage
    }
  }
}
