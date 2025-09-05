<template>
  <div v-if="isOpen" class="modal__overlay" @click="closeModal">
    <div class="modal__dialog">
      <div 
        class="modal__content" 
        @click.stop
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="modal__header">
          <slot name="header">
            <h5 class="modal__title">{{ title }}</h5>
          </slot>
          <button 
            type="button" 
            class="modal__close" 
            @click="closeModal"
          >
            <span>&times;</span>
          </button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal__footer">
          <slot name="footer">
            <button class="btn btn--outline-secondary" @click="closeModal">Cancelar</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    }
  },
  emits: ['close'],
  data() {
    return {
      touchStartY: 0,
      touchCurrentY: 0,
      isDragging: false
    }
  },
  mounted() {
    // Cerrar modal con tecla Escape
    if (import.meta.client) {
      document.addEventListener('keydown', this.handleEscape)
    }
  },
  beforeUnmount() {
    if (import.meta.client) {
      document.removeEventListener('keydown', this.handleEscape)
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleEscape(event) {
      if (event.key === 'Escape' && this.isOpen) {
        this.closeModal()
      }
    },
    handleTouchStart(event) {
      if (window.innerWidth <= 575) {
        this.touchStartY = event.touches[0].clientY
        this.isDragging = true
      }
    },
    handleTouchMove(event) {
      if (!this.isDragging || window.innerWidth > 575) return
      
      this.touchCurrentY = event.touches[0].clientY
      const deltaY = this.touchCurrentY - this.touchStartY
      
      // Only allow downward swipe to close
      if (deltaY > 0) {
        const modal = event.currentTarget
        modal.style.transform = `translateY(${Math.min(deltaY, 100)}px)`
        modal.style.opacity = Math.max(1 - deltaY / 200, 0.5)
      }
    },
    handleTouchEnd(event) {
      if (!this.isDragging || window.innerWidth > 575) return
      
      const deltaY = this.touchCurrentY - this.touchStartY
      const modal = event.currentTarget
      
      // If swiped down more than 50px, close modal
      if (deltaY > 50) {
        this.closeModal()
      } else {
        // Reset position
        modal.style.transform = ''
        modal.style.opacity = ''
      }
      
      this.isDragging = false
      this.touchStartY = 0
      this.touchCurrentY = 0
    }
  }
}
</script>

<style scoped>
/* Modal Block */
.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-backdrop);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1055;
  backdrop-filter: blur(2px);
}

.modal__dialog {
  position: relative;
  width: auto;
  margin: 1rem;
  pointer-events: none;
  max-width: 95vw;
  min-width: 280px;
}

/* Mobile First Responsive Design */
@media (max-width: 575px) {
  .modal__dialog {
    margin: 0.5rem;
    max-width: calc(100vw - 1rem);
    min-width: auto;
  }
  
  .modal__content {
    border-radius: 0.25rem;
  }
}

@media (min-width: 576px) {
  .modal__dialog {
    max-width: 540px;
    margin: 1.5rem auto;
    min-width: 500px;
  }
}

@media (min-width: 768px) {
  .modal__dialog {
    max-width: 700px;
    margin: 2rem auto;
  }
}

@media (min-width: 992px) {
  .modal__dialog {
    max-width: 800px;
    margin: 3rem auto;
  }
}

@media (min-width: 1200px) {
  .modal__dialog {
    max-width: 900px;
  }
}

.modal__content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: var(--modal-bg);
  background-clip: padding-box;
  border: 1px solid var(--card-border);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-out;
}

.modal__header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  border-top-left-radius: calc(0.5rem - 1px);
  border-top-right-radius: calc(0.5rem - 1px);
  min-height: 3.5rem;
  background-color: var(--card-bg);
}

@media (max-width: 575px) {
  .modal__header {
    padding: 0.75rem 1rem;
    min-height: 3rem;
  }
}

.modal__title {
  margin: 0;
  line-height: 1.2;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
  word-break: break-word;
  overflow-wrap: break-word;
}

@media (max-width: 575px) {
  .modal__title {
    font-size: 1.1rem;
    padding-right: 0.5rem;
  }
}

.modal__close {
  box-sizing: content-box;
  width: 2rem;
  height: 2rem;
  padding: 0;
  color: var(--text);
  background: transparent;
  border: 0;
  border-radius: 0.375rem;
  opacity: 0.6;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 1rem;
  /* Better touch target for mobile */
  min-width: 44px;
  min-height: 44px;
}

@media (max-width: 575px) {
  .modal__close {
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }
}

.modal__close:hover {
  opacity: 0.9;
  background-color: var(--light);
  transform: scale(1.05);
}

.modal__close:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  opacity: 1;
}

.modal__body {
  position: relative;
  flex: 1 1 auto;
  padding: 1.5rem;
  min-height: 150px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

@media (max-width: 575px) {
  .modal__body {
    padding: 1rem;
    min-height: 120px;
    max-height: calc(100vh - 160px);
  }
}

@media (min-width: 768px) {
  .modal__body {
    padding: 2rem;
    min-height: 200px;
  }
}

.modal__footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  border-bottom-right-radius: calc(0.5rem - 1px);
  border-bottom-left-radius: calc(0.5rem - 1px);
  gap: 0.75rem;
  background-color: var(--card-bg);
  min-height: 3.5rem;
}

@media (max-width: 575px) {
  .modal__footer {
    padding: 0.75rem 1rem;
    flex-direction: column-reverse;
    gap: 0.5rem;
    min-height: auto;
  }
  
  .modal__footer .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .modal__footer {
    padding: 1.5rem 2rem;
    gap: 1rem;
    min-height: 4rem;
  }
}

/* Button Styles */
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text);
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn:hover {
  color: var(--text);
}

.btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
}

.btn-primary:hover {
  color: #fff;
  background-color: var(--btn-primary-hover);
  border-color: var(--btn-primary-border);
}

.btn-primary:focus {
  color: #fff;
  background-color: var(--btn-primary-hover);
  border-color: var(--btn-primary-border);
  box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
}

.btn-primary:disabled {
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
  opacity: 0.65;
}

.btn-secondary {
  color: #fff;
  background-color: var(--secondary);
  border-color: var(--secondary);
}

.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}

.btn-secondary:focus {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);
}
</style>
