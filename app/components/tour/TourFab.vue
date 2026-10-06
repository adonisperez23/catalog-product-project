<template>
    <button
        v-if="!state.active && !$store.modal_on"
        @click="start($store.cart.length)"
        class="fixed bottom-[16px] right-[16px] z-40 flex justify-center items-center gap-[8px] h-[48px] px-[16px] rounded-full bg-[#FFBC0D] border border-[#522711] text-[#522711] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.35)] hover:translate-y-[-4px] transition-transform"
    >
        <span class="text-[18px]">🍽️</span>
        <span class="text-[14px] font-medium whitespace-nowrap">{{
            label
        }}</span>
    </button>
</template>

<script setup lang="ts">
const $store = useStore();
const { state, start, was_completed } = useTour();

const label = computed(() => {
    void state.value.finished;
    return state.value.finished || was_completed()
        ? "Repetir tutorial"
        : "¿Cómo pedir?";
});
</script>

<style scoped></style>
