// Composable para manejar validación de inputs
export function useInputValidation() {
  
  // Validar teclas permitidas para inputs numéricos
  function validateNumericKeydown(event) {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ]
    
    // Permitir teclas de control y dígitos (0-9)
    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault()
    }
  }

  // Validar y procesar valores numéricos
  function processNumericValue(value, currentValue) {
    // Prevenir valores negativos, decimales y caracteres inválidos
    if (value.startsWith('-') || 
        Number(value) < 0 || 
        value.includes('e') || 
        value.includes('E') || 
        value.includes('.') || 
        value.includes('+')) {
      return { shouldUpdate: false }
    }
    
    // Solo permitir números enteros positivos y cero
    if (value === '') {
      return { shouldUpdate: true, processedValue: '' }
    } else if (/^\d+$/.test(value)) {
      return { shouldUpdate: true, processedValue: Number(value) }
    } else {
      return { shouldUpdate: false, revertValue: currentValue || '' }
    }
  }

  return {
    validateNumericKeydown,
    processNumericValue
  }
}
