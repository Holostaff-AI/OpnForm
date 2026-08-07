<template>
  <FormSubmissions :form="form" />
</template>

<script setup>
import FormSubmissions from "~/components/open/forms/components/FormSubmissions.vue"
import { holostaff } from '@holostaff/sdk'
import { onMounted } from 'vue'

const props = defineProps({
  form: { type: Object, required: true },
})

definePageMeta({
  middleware: "auth",
})
useOpnSeoMeta({
  title: props.form
    ? "Form Submissions - " + props.form.title
    : "Form Submissions",
})

// ── Holostaff instrumentation ──────────────────────────────────
// Added by the Holostaff deploy agent (OpnForm · deploy v1).
// Marks the visitor entering the "adoption" journey stage when
// this entry page mounts — powers stage-aware copilot monitoring.
// Safe to relocate; keep one call per entry page. https://docs.holostaff.ai
onMounted(() => holostaff.markStageEntry('adoption')) // entry page for "View and manage submissions"



</script>
