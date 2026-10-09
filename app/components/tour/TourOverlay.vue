<template>
    <div
        v-if="state.active"
        class="fixed inset-0 z-50 pointer-events-none"
        aria-live="polite"
    >
        <div
            v-if="rect && !state.finished"
            class="absolute rounded-[12px]"
            :style="spotlight_style"
        ></div>
        <div
            v-else
            class="absolute inset-0 bg-[rgba(17,17,17,0.55)]"
        ></div>

        <div
            ref="card_el"
            class="pointer-events-auto absolute flex flex-col gap-[16px] w-[340px] max-w-[calc(100vw-24px)] bg-[#FFFFF6] border border-[#522711] rounded-[12px] p-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            :style="card_style"
        >
            <template v-if="state.finished">
                <div class="flex flex-col items-center gap-[8px] text-center">
                    <div class="text-[40px] leading-none">🎉</div>
                    <span
                        class="text-[12px] font-medium bg-[#117554] text-white px-[8px] py-[2px] rounded-full"
                        >Tutorial completado</span
                    >
                    <h4>¡Ya sabes pedir!</h4>
                    <p class="text-[14px]">
                        Recorriste los 5 pasos: <strong>explora</strong>,
                        <strong>personaliza</strong>, <strong>revisa</strong>,
                        <strong>elige tu entrega</strong> y
                        <strong>confirma por WhatsApp</strong>. 🚀
                    </p>
                    <div class="text-[18px]">
                        ⭐ {{ state.stars }}/{{ beats.length }}
                    </div>
                </div>
                <div class="flex flex-col gap-[8px]">
                    <button
                        @click="close()"
                        class="w-full h-[44px] rounded-[6px] bg-[#FFBC0D] border border-[#522711] text-[#522711]"
                    >
                        <h3>¡Entendido! 🍽️</h3>
                    </button>
                    <button
                        @click="start(0)"
                        class="text-[13px] text-[#858589] underline"
                    >
                        Repetir tutorial
                    </button>
                </div>
            </template>

            <template v-else-if="current_beat">
                <div class="flex justify-between items-center gap-[8px]">
                    <div class="flex items-center gap-[8px]">
                        <span class="text-[18px]">{{ current_beat.emoji }}</span>
                        <span
                            class="text-[11px] font-medium bg-[#FF4545] text-white px-[8px] py-[2px] rounded-full whitespace-nowrap"
                            >Paso {{ step }}/5</span
                        >
                    </div>
                    <span class="text-[12px] text-[#858589]"
                        >⭐ {{ state.stars }}/{{ beats.length }}</span
                    >
                </div>

                <div
                    class="h-[6px] w-full bg-[#D7D7D7] rounded-full overflow-hidden"
                >
                    <div
                        class="h-full bg-[#FFBC0D] transition-[width] duration-300"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>

                <div class="flex flex-col gap-[10px]">
                    <h4>{{ current_beat.title }}</h4>
                    <ul class="flex flex-col gap-[8px]">
                        <li
                            v-for="(bullet, index) in current_beat.bullets"
                            :key="index"
                            class="flex gap-[8px] text-[14px] leading-[1.4]"
                        >
                            <span class="text-[#FF4545]">›</span>
                            <span>
                                <template
                                    v-for="(segment, s_index) in parse(bullet)"
                                    :key="s_index"
                                    ><strong v-if="segment.bold">{{
                                        segment.text
                                    }}</strong
                                    ><template v-else>{{
                                        segment.text
                                    }}</template></template
                                >
                            </span>
                        </li>
                    </ul>
                </div>

                <div
                    v-if="current_beat.hint"
                    class="bg-[#FFF3D6] border border-[#FBD288] rounded-[8px] p-[10px] text-[13px] leading-[1.4]"
                >
                    💡
                    <template
                        v-for="(segment, index) in parse(current_beat.hint)"
                        :key="index"
                        ><strong v-if="segment.bold">{{
                            segment.text
                        }}</strong
                        ><template v-else>{{
                            segment.text
                        }}</template></template
                    >
                </div>

                <div
                    v-if="current_beat.advance === 'auto'"
                    class="text-[12px] text-[#858589]"
                >
                    ⏳ Esperando tu acción… (o pulsa Continuar)
                </div>

                <div class="flex items-center gap-[8px]">
                    <button
                        v-if="state.index > 0"
                        @click="back()"
                        class="text-[13px] text-[#333333] px-[6px]"
                    >
                        ◀ Atrás
                    </button>
                    <button
                        @click="skip()"
                        class="text-[13px] text-[#858589] underline"
                    >
                        Saltar ✕
                    </button>
                    <button
                        @click="next()"
                        class="ml-auto h-[40px] px-[16px] rounded-[6px] bg-[#FFBC0D] border border-[#522711] text-[#522711]"
                    >
                        <h5>{{ current_beat.cta ?? "Siguiente ▸" }}</h5>
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TourPlacement } from "~/types/tour";

type TourRect = {
    left: number;
    top: number;
    width: number;
    height: number;
    bottom: number;
    right: number;
};

const $store = useStore();
const {
    state,
    current_beat,
    step,
    progress,
    beats,
    start,
    next,
    back,
    skip,
    close,
    init_from_storage,
} = useTour();

const rect = ref<TourRect | null>(null);
const centered = ref(false);
const card_el = ref<HTMLElement | null>(null);
const card_style = ref<Record<string, string>>({
    left: "0px",
    top: "0px",
});

const spotlight_style = computed(() => {
    const r = rect.value;
    if (!r) return {};
    return {
        left: `${r.left - 8}px`,
        top: `${r.top - 8}px`,
        width: `${r.width + 16}px`,
        height: `${r.height + 16}px`,
        boxShadow: "0 0 0 100vmax rgba(17,17,17,0.55)",
        transition: "left 0.25s ease, top 0.25s ease, width 0.25s ease",
    };
});

let raf_id = 0;
let poll_id = 0;
let missing_since = 0;
let pending_scroll = false;

function parse(text: string) {
    return text
        .split(/\*\*(.+?)\*\*/g)
        .map((part, index) => ({ text: part, bold: index % 2 === 1 }))
        .filter((segment) => segment.text.length > 0);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function run_pending_scroll(element: HTMLElement) {
    if (!pending_scroll) return;
    const beat = current_beat.value;
    if (!beat?.before_show) {
        pending_scroll = false;
        return;
    }
    if (beat.before_show === "scroll_top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        element.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    pending_scroll = false;
}

function position() {
    const card = card_el.value;
    if (!card) return;

    const margin = 12;
    const gap = 16;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cw = card.offsetWidth;
    const ch = card.offsetHeight;
    const centered_mode =
        centered.value || state.value.finished || !rect.value;

    let left: number;
    let top: number;

    if (centered_mode) {
        left = (vw - cw) / 2;
        top = (vh - ch) / 2;
    } else {
        const r = rect.value!;
        const candidates: Record<TourPlacement, { left: number; top: number }> =
            {
                bottom: {
                    left: r.left + r.width / 2 - cw / 2,
                    top: r.bottom + gap,
                },
                top: {
                    left: r.left + r.width / 2 - cw / 2,
                    top: r.top - gap - ch,
                },
                right: {
                    left: r.right + gap,
                    top: r.top + r.height / 2 - ch / 2,
                },
                left: {
                    left: r.left - gap - cw,
                    top: r.top + r.height / 2 - ch / 2,
                },
            };

        const fits = (placement: TourPlacement) =>
            candidates[placement].left >= margin &&
            candidates[placement].top >= margin &&
            candidates[placement].left + cw <= vw - margin &&
            candidates[placement].top + ch <= vh - margin;

        const visible_area = (placement: TourPlacement) => {
            const c = candidates[placement];
            const w =
                Math.min(c.left + cw, vw - margin) -
                Math.max(c.left, margin);
            const h =
                Math.min(c.top + ch, vh - margin) - Math.max(c.top, margin);
            return Math.max(w, 0) * Math.max(h, 0);
        };

        const order: TourPlacement[] = [
            ...(current_beat.value?.placement
                ? [current_beat.value.placement]
                : []),
            "bottom",
            "top",
            "right",
            "left",
        ];

        const preferred = order.filter(
            (placement, index, list) => list.indexOf(placement) === index
        );

        const chosen =
            preferred.find(fits) ??
            preferred.reduce((best, placement) =>
                visible_area(placement) > visible_area(best)
                    ? placement
                    : best
            );

        left = clamp(candidates[chosen].left, margin, vw - margin - cw);
        top = clamp(candidates[chosen].top, margin, vh - margin - ch);
    }

    left = clamp(left, margin, Math.max(margin, vw - margin - cw));
    top = clamp(top, margin, Math.max(margin, vh - margin - ch));

    const next_style = { left: `${left}px`, top: `${top}px` };
    if (
        next_style.left !== card_style.value.left ||
        next_style.top !== card_style.value.top
    ) {
        card_style.value = next_style;
    }
}

function measure() {
    if (!state.value.active) {
        rect.value = null;
        return;
    }
    if (state.value.finished) {
        rect.value = null;
        position();
        return;
    }

    const beat = current_beat.value;
    if (!beat) return;

    const element = document.querySelector(beat.target) as HTMLElement | null;

    if (!element) {
        if (!missing_since) missing_since = performance.now();
        if (performance.now() - missing_since > 700) {
            centered.value = true;
            rect.value = null;
            position();
        }
        return;
    }

    missing_since = 0;
    centered.value = false;
    run_pending_scroll(element);
    const bounds = element.getBoundingClientRect();
    rect.value = {
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
        bottom: bounds.bottom,
        right: bounds.right,
    };
    position();
}

function loop() {
    measure();
    raf_id = requestAnimationFrame(loop);
}

function start_loop() {
    if (!import.meta.client) return;
    cancelAnimationFrame(raf_id);
    raf_id = requestAnimationFrame(loop);
}

function stop_loop() {
    if (!import.meta.client) return;
    cancelAnimationFrame(raf_id);
}

watch(
    () => state.value.active,
    (active) => {
        missing_since = 0;
        centered.value = false;
        rect.value = null;
        pending_scroll = true;
        if (active) start_loop();
        else stop_loop();
    },
    { immediate: true }
);

watch(
    () => [state.value.index, state.value.finished],
    () => {
        missing_since = 0;
        centered.value = false;
        rect.value = null;
        pending_scroll = true;
    }
);

onMounted(() => {
    init_from_storage();
    pending_scroll = true;

    poll_id = window.setInterval(() => {
        const beat = current_beat.value;
        if (!state.value.active || state.value.finished || !beat) return;
        if (
            beat.advance === "auto" &&
            beat.when &&
            beat.when($store.value, state.value)
        ) {
            next();
        }
    }, 250);
});

onUnmounted(() => {
    stop_loop();
    clearInterval(poll_id);
});
</script>

<style scoped></style>
