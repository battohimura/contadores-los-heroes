<template>
  <form id="contador-form" class="contador-form" @submit.prevent="handleSubmit">
    <div class="form-fields">
      <FormField
        v-model="formData.nombre"
        :label="formConfig.fields.nombre.label"
        :placeholder="formConfig.fields.nombre.placeholder"
        :error="errors.nombre"
        :has-error="!!errors.nombre"
        type="text"
        @validate="() => validateSingleField('nombre')"
      />
      
      <FormField
        v-model="formData.cantidad"
        :label="formConfig.fields.cantidad.label"
        :placeholder="formConfig.fields.cantidad.placeholder"
        :error="errors.cantidad"
        :has-error="!!errors.cantidad"
        type="number"
        @validate="() => validateSingleField('cantidad')"
      />
    </div>

  </form>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useFormValidation } from '~/composables/useFormValidation'
import { contadorSchema } from '~/utils/validation'
import { CONTADOR_FORM_CONFIG } from '~/constants/forms'
import FormField from '~/components/ui/FormField.vue'

export default {
  name: 'ContadorForm',
  components: {
    FormField
  },
  emits: ['submit', 'validation-change', 'cancel'],
  setup(props, { emit }) {
    const initialData = {
      nombre: '',
      cantidad: 0
    }

    const {
      formData,
      errors,
      isSubmitting,
      isValid,
      validateForm,
      validateSingleField,
      resetForm,
      setupRealtimeValidation
    } = useFormValidation(contadorSchema, initialData)

    // Configurar validación en tiempo real
    onMounted(() => {
      setupRealtimeValidation(['nombre', 'cantidad'])
    })

    // Emitir cambios de validación al componente padre
    watch(isValid, (newValue) => {
      emit('validation-change', newValue)
    }, { immediate: true })

    async function handleSubmit() {
      if (!validateForm()) {
        return
      }

      isSubmitting.value = true
      
      try {
        emit('submit', { ...formData })
        resetForm()
      } catch (error) {
        console.error('Error al enviar formulario:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      errors,
      isSubmitting,
      isValid,
      validateSingleField,
      handleSubmit,
      formConfig: CONTADOR_FORM_CONFIG
    }
  }
}
</script>

<style scoped>
.contador-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
</style>
