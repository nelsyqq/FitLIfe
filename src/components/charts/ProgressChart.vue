<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-dark">{{ title }}</h3>
      <div class="flex gap-2">
        <button
          v-for="period in periods"
          :key="period.value"
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
            activePeriod === period.value
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          ]"
          @click="$emit('changePeriod', period.value)"
        >
          {{ period.label }}
        </button>
      </div>
    </div>
    <div class="bg-white rounded-3xl p-5 shadow-card">
      <div v-if="!data || data.length === 0" class="flex items-center justify-center h-48 text-gray-400">
        <span>No data available</span>
      </div>
      <svg
        v-else
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        class="w-full"
        style="max-height: 200px"
      >
        <!-- Grid lines -->
        <line
          v-for="(_, i) in gridLines"
          :key="i"
          :x1="padding"
          :y1="(svgHeight - padding) * (1 - i / (gridLines.length - 1))"
          :x2="svgWidth - padding"
          :y2="(svgHeight - padding) * (1 - i / (gridLines.length - 1))"
          stroke="#f0f0f0"
          stroke-width="1"
        />

        <!-- Data line -->
        <path
          :d="linePath"
          fill="none"
          :stroke="color"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="chart-line"
        />

        <!-- Area fill -->
        <path
          :d="areaPath"
          :fill="color"
          :opacity="0.1"
        />

        <!-- Data points -->
        <circle
          v-for="(point, i) in points"
          :key="i"
          :cx="point.x"
          :cy="point.y"
          :r="point.isHovered ? 5 : 3.5"
          :fill="color"
          :stroke="color"
          :stroke-width="point.isHovered ? 3 : 0"
          class="transition-all duration-200"
        />

        <!-- Labels -->
        <text
          v-for="(label, i) in xLabels"
          :key="'xl-' + i"
          :x="xPositions[i]"
          :y="svgHeight - 8"
          text-anchor="middle"
          class="text-[10px] fill-gray-400"
        >
          {{ label }}
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array as () => { label: string; value: number }[],
    default: () => []
  },
  color: {
    type: String,
    default: '#22C55E'
  },
  activePeriod: {
    type: String,
    default: 'week'
  },
  periods: {
    type: Array as () => { label: string; value: string }[],
    default: () => [
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' }
    ]
  }
})

defineEmits<{
  (e: 'changePeriod', period: string): void
}>()

const padding = 30
const svgWidth = 300
const svgHeight = 200
const chartWidth = svgWidth - padding * 2
const chartHeight = svgHeight - padding * 2

const gridLines = computed(() => {
  const count = 5
  return Array.from({ length: count }, (_, i) => i)
})

const maxValue = computed(() => {
  if (!props.data || props.data.length === 0) return 100
  return Math.max(...props.data.map(d => d.value)) * 1.2
})

const xPositions = computed(() => {
  if (!props.data || props.data.length === 0) return []
  return props.data.map((_, i) => {
    return padding + (chartWidth / (props.data!.length - 1)) * i
  })
})

const points = computed(() => {
  if (!props.data || props.data.length === 0) return []
  return props.data.map((d, i) => {
    const x = padding + (chartWidth / (props.data!.length - 1)) * i
    const y = svgHeight - padding - (d.value / maxValue.value) * chartHeight
    return { x, y, value: d.value, label: d.label, isHovered: false }
  })
})

const linePath = computed(() => {
  if (points.value.length === 0) return ''
  return points.value.map((p, i) => {
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  }).join(' ')
})

const areaPath = computed(() => {
  if (points.value.length === 0) return ''
  const first = points.value[0]
  const last = points.value[points.value.length - 1]
  const topPath = points.value.map((p, i) => {
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  }).join(' ')
  return `${topPath} L ${last.x} ${svgHeight - padding} L ${first.x} ${svgHeight - padding} Z`
})

const xLabels = computed(() => {
  if (!props.data) return []
  return props.data.map(d => d.label)
})
</script>

<style scoped>
.chart-line {
  animation: drawLine 1s ease-out;
}

@keyframes drawLine {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}
</style>