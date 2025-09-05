<template>
  <Transition
    name="toast"
    enter-active-class="toast-enter-active"
    leave-active-class="toast-leave-active"
    enter-from-class="toast-enter-from"
    leave-to-class="toast-leave-to"
  >
    <div
      v-if="visible"
      :class="[
        'toast',
        `toast--${type}`,
        { 'toast--dismissible': dismissible }
      ]"
      role="alert"
      :aria-live="type === 'error' ? 'assertive' : 'polite'"
    >
      <div class="toast__icon">
        <Icon 
          v-if="type === 'success'" 
          name="heroicons:check-circle-20-solid" 
        />
        <Icon 
          v-else-if="type === 'error'" 
          name="heroicons:x-circle-20-solid" 
        />
        <Icon 
          v-else-if="type === 'warning'" 
          name="heroicons:exclamation-triangle-20-solid" 
        />
        <Icon 
          v-else 
          name="heroicons:information-circle-20-solid" 
        />
      </div>
      
      <div class="toast__content">
        <div v-if="title" class="toast__title">{{ title }}</div>
        <div class="toast__message">{{ message }}</div>
      </div>
      
      <button
        v-if="dismissible"
        type="button"
        class="toast__close"
        aria-label="Cerrar notificación"
        @click="dismiss"
      >
        <span>&times;</span>
      </button>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 5000
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: ['dismiss'],
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.dismiss()
      }, this.duration)
    }
  },
  methods: {
    dismiss() {
      this.$emit('dismiss')
    }
  }
}
</script>

<style scoped>
.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 300px;
  max-width: 500px;
  position: relative;
  overflow: hidden;
}

.toast::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: currentColor;
}

.toast__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
}

.toast__content {
  flex: 1;
  min-width: 0;
}

.toast__title {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25;
  margin-bottom: 0.25rem;
  color: var(--text);
}

.toast__message {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-muted);
}

.toast__close {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  margin-top: -0.25rem;
  margin-right: -0.25rem;
}

.toast__close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text);
}

.toast__close:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Toast Variants */
.toast--success {
  color: #ffffff;
  border-color: #10b981;
  background: #10b981;
}

.toast--success .toast__title {
  color: #ffffff;
}

.toast--success .toast__message {
  color: #f0fdf4;
}

.toast--error {
  color: #ffffff;
  border-color: #ef4444;
  background: #ef4444;
}

.toast--error .toast__title {
  color: #ffffff;
}

.toast--error .toast__message {
  color: #fef2f2;
}

.toast--warning {
  color: #ffffff;
  border-color: #f59e0b;
  background: #f59e0b;
}

.toast--warning .toast__title {
  color: #ffffff;
}

.toast--warning .toast__message {
  color: #fffbeb;
}

.toast--info {
  color: #ffffff;
  border-color: #3b82f6;
  background: #3b82f6;
}

.toast--info .toast__title {
  color: #ffffff;
}

.toast--info .toast__message {
  color: #eff6ff;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast--success {
    background: #059669;
    border-color: #059669;
  }
  
  .toast--error {
    background: #dc2626;
    border-color: #dc2626;
  }
  
  .toast--warning {
    background: #d97706;
    border-color: #d97706;
  }
  
  .toast--info {
    background: #2563eb;
    border-color: #2563eb;
  }
}

/* Animations */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* Responsive */
@media (max-width: 640px) {
  .toast {
    min-width: auto;
    max-width: calc(100vw - 2rem);
    margin: 0 1rem;
  }
}
</style>
