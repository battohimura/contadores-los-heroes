<template>
  <Teleport to="body">
    <div
      v-if="toasts.length > 0"
      class="toast-container"
      aria-live="polite"
      aria-label="Notificaciones"
    >
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
        :duration="0"
        :dismissible="toast.dismissible"
        :visible="toast.visible"
        @dismiss="removeToast(toast.id)"
      />
    </div>
  </Teleport>
</template>

<script>
import { useToast } from '~/composables/useToast'
import Toast from './Toast.vue'

export default {
  name: 'ToastContainer',
  components: {
    Toast
  },
  setup() {
    const { toasts, removeToast } = useToast()

    return {
      toasts,
      removeToast
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  pointer-events: none;
}

.toast-container > * {
  pointer-events: auto;
}

/* Responsive positioning */
@media (max-width: 640px) {
  .toast-container {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    width: auto;
  }
}

@media (max-width: 480px) {
  .toast-container {
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
  }
}
</style>
