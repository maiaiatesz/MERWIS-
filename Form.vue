<template>
  <div>
    <q-stepper ref="stepper">
      <!-- Step: -->
      <q-step default title="Simple questions" subtitle="Recommended">
        Mobilos kérdések
      </q-step>

      <!-- Step: -->
      <q-step title="Full profile">
        Orvosi kérdések
      </q-step>

      <!-- Step: -->
      <q-step title="Additional info" subtitle="Review and submit">
        Additional questions
      </q-step>

      <!--
      Optional.

      "Globally" available Stepper navigation which means
      that it will be visible regardless of the current step.
      If we'd put QStepperNavigation under a QStep then we'd
      be using it for that step only.
    -->
    <q-stepper-navigation>
      <q-btn
      flat
      @click="$refs.stepper.previous()"
      label="Back"
      />
      <q-btn
      @click="$refs.stepper.next()"
      label="Next"
      />
    </q-stepper-navigation>
  </q-stepper>
</div>
</template>

<script>
export default {
  // name: 'Form',
  data () {
    return {}
  }
}
</script>

<style>
</style>
