<template>
  <Modal 
    :is-open="isOpen" 
    title="Agregar Contador" 
    @close="$emit('close')"
  >
    <ContadorForm @submit="handleSubmit" @validation-change="updateFormValid" />
    
    <template #footer>
      <div class="modal__actions">
        <button class="btn btn--outline-secondary btn--lg" @click="$emit('close')">
          <Icon name="heroicons:x-mark-20-solid" class="u-me--sm" />
          Cancelar
        </button>
        <button 
          type="submit" 
          form="contador-form"
          class="btn btn--success btn--lg" 
          :class="{ 'btn--loading': isSubmitting }"
          :disabled="isSubmitting || !isFormValid"
        >
          <Icon v-if="!isSubmitting" name="heroicons:check-20-solid" class="u-me--sm" />
          {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './ui/Modal.vue'
import ContadorForm from './forms/ContadorForm.vue'

export default {
  name: 'ContadorModal',
  components: {
    Modal,
    ContadorForm
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'submit'],
  data() {
    return {
      isSubmitting: false,
      isFormValid: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit(formData) {
      this.isSubmitting = true
      this.$emit('submit', formData)
      this.handleClose()
      this.isSubmitting = false
    },
    updateFormValid(isValid) {
      this.isFormValid = isValid
    }
  }
}
</script>

<style scoped>
.modal__actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
</style>
