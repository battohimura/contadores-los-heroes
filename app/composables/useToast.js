import { ref, reactive } from 'vue'

// Global toast state
const toasts = ref([])
let toastId = 0

export const useToast = () => {
  const addToast = (options) => {
    const id = ++toastId
    const toast = reactive({
      id,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message || '',
      duration: options.duration !== undefined ? options.duration : 5000,
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
      visible: true
    })

    toasts.value.push(toast)

    // Auto-dismiss if duration is set
    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value[index].visible = false
      // Remove from array after animation completes
      setTimeout(() => {
        const currentIndex = toasts.value.findIndex(toast => toast.id === id)
        if (currentIndex > -1) {
          toasts.value.splice(currentIndex, 1)
        }
      }, 300)
    }
  }

  const clearAllToasts = () => {
    toasts.value.forEach(toast => {
      toast.visible = false
    })
    setTimeout(() => {
      toasts.value.splice(0)
    }, 300)
  }

  // Convenience methods for different toast types
  const showSuccess = (message, options = {}) => {
    return addToast({
      type: 'success',
      message,
      title: options.title || 'Éxito',
      ...options
    })
  }

  const showError = (message, options = {}) => {
    return addToast({
      type: 'error',
      message,
      title: options.title || 'Error',
      duration: options.duration !== undefined ? options.duration : 7000, // Longer duration for errors
      ...options
    })
  }

  const showWarning = (message, options = {}) => {
    return addToast({
      type: 'warning',
      message,
      title: options.title || 'Advertencia',
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    return addToast({
      type: 'info',
      message,
      title: options.title || 'Información',
      ...options
    })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
