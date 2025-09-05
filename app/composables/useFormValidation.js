import { ref, reactive, watch } from 'vue'
import { processZodErrors, validateField } from '~/utils/validation'

export function useFormValidation(schema, initialData = {}) {
  const formData = reactive({ ...initialData })
  const errors = ref({})
  const isSubmitting = ref(false)
  const isValid = ref(false)

  // Validar todo el formulario
  function validateForm() {
    try {
      schema.parse(formData)
      errors.value = {}
      isValid.value = true
      return true
    } catch (error) {
      errors.value = processZodErrors(error)
      isValid.value = false
      return false
    }
  }

  // Validar un campo específico
  function validateSingleField(fieldName) {
    const result = validateField(schema, fieldName, formData[fieldName])
    
    if (result.isValid) {
      const newErrors = { ...errors.value }
      delete newErrors[fieldName]
      errors.value = newErrors
    } else {
      errors.value = { ...errors.value, [fieldName]: result.error }
    }
    
    // Actualizar isValid después de validar el campo
    updateIsValid()
    
    return result.isValid
  }

  // Actualizar el estado isValid basado en si hay errores y todos los campos requeridos están llenos
  function updateIsValid() {
    try {
      schema.parse(formData)
      isValid.value = Object.keys(errors.value).length === 0
    } catch {
      isValid.value = false
    }
  }

  // Resetear formulario
  function resetForm() {
    Object.keys(formData).forEach(key => {
      formData[key] = initialData[key] || ''
    })
    errors.value = {}
    isSubmitting.value = false
    isValid.value = false
  }

  // Configurar validación en tiempo real
  function setupRealtimeValidation(fieldsToWatch = []) {
    fieldsToWatch.forEach(fieldName => {
      watch(
        () => formData[fieldName],
        () => {
          if (errors.value[fieldName]) {
            validateSingleField(fieldName)
          }
        }
      )
    })
  }

  return {
    formData,
    errors,
    isSubmitting,
    isValid,
    validateForm,
    validateSingleField,
    resetForm,
    setupRealtimeValidation
  }
}
