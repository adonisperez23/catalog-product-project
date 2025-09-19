<template>
    <div
        @click="openModal"
        class="flex flex-col gap-[16px] hover:translate-y-[-12px] active-hover"
    >
        <picture>
            <source type="image/avif" :srcset="img_avif_url" />
            <source type="image/jpeg" :srcset="img_url" />
            <img
                :src="img_url"
                class="size-[320px] border border-[#D7D7D7] hover:border-[#72BF78] object-cover rounded-[16px]"
                loading="lazy"
            />
        </picture>
        <div class="flex flex-col gap-[8px]">
            <div class="flex items-center">
                <h2 class="whitespace-nowrap underline-hover-effect">
                    {{ name }}
                </h2>
            </div>
            <p>${{ price }}</p>
        </div>
    </div>
    <ModalProduct
        v-if="_open_modal"
        :product="new ProductOrder($props)"
        v-on:close="closeModal"
    />
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";
import ModalProduct from "../modal/ModalProduct.vue";
import { ProductOrder } from "~/types/ProductOrder";

const $props = defineProps<Product>();

const _open_modal = ref(false);

function closeModal() {
    useHead({
        bodyAttrs: {
            style: { overflow: "auto" },
        },
    });
    _open_modal.value = false;
}

function openModal() {
    useHead({
        bodyAttrs: {
            style: { overflow: "hidden" },
        },
    });
    _open_modal.value = true;
}
</script>

<style scoped>
.underline-hover-effect {
    position: relative;
    text-decoration: none;
    color: black;
    font-size: 20px;
    cursor: pointer;
}

.underline-hover-effect::before {
    content: "";
    position: absolute;
    width: 100%; /* El ancho es siempre 100% */
    height: 1px;
    bottom: 0px;
    left: 0;
    background-color: black;
    transform: scaleX(0); /* Escala inicial: 0 */
    transform-origin: bottom left; /* Punto de origen de la transformación */
    transition: transform 0.3s ease-in-out;
}

.active-hover:hover .underline-hover-effect::before {
    transform: scaleX(1); /* Escala final: 1 (se expande) */
}
</style>
