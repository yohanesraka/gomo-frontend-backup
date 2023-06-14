<template>
  <div>
    <VCalendar :attributes="attributes" :start-date="startDate" />
  </div>
</template>

<script>
import { ref } from "vue";
import { Calendar } from "v-calendar";

export default {
  components: {
    VCalendar: Calendar,
  },
  props: {
    initialPhase: {
      type: String,
      default: "Perkawinan",
    },
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  setup(props) {
    const attributes = ref([]);

    const phases = [
      { highlight: "pink", duration: 20, label: "Perkawinan" },
      { highlight: "yellow", duration: 120, label: "Kebuntingan" },
      { highlight: "blue", duration: 30, label: "Kering" },
      { highlight: "green", duration: 7, label: "Kelahiran" },
      { highlight: "green", duration: 60, label: "Laktasi" },
    ];

    const initialPhaseIndex = phases.findIndex(
      (phase) => phase.label.toLowerCase() === props.initialPhase.toLowerCase()
    );

    if (initialPhaseIndex === -1) {
      throw new Error("Invalid initial phase");
    }

    const totalPhases = phases.length;
    let currentPhaseIndex = initialPhaseIndex;
    let iteration = 0;
    let startDate = new Date(props.startDate); // Assigning the prop value to local startDate variable

    while (iteration < 3) {
      const phase = phases[currentPhaseIndex];

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + phase.duration - 1);

      attributes.value.push({
        highlight: phase.highlight,
        dates: [[startDate, endDate]],
        popover: {
          label: phase.label,
        },
      });

      startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() + 1);

      currentPhaseIndex = (currentPhaseIndex + 1) % totalPhases;

      if (currentPhaseIndex === initialPhaseIndex) {
        iteration++;
      }
    }

    return {
      attributes,
    };
  },
};
</script>

<style></style>
