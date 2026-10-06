import type { TourBeat, TourState } from "~/types/tour";

export const TOUR_BEATS: TourBeat[] = [
    {
        id: "empezar",
        step: 1,
        emoji: "🍴",
        title: "Explora el catálogo",
        bullets: [
            "Toca **Empezar pedido** (o el enlace **Menu** de la barra) para bajar hasta el menú.",
            "Hay **19 platos caseros** con su precio a la vista. No hay buscador: recorre la grilla.",
            "**Los pedidos se envían por WhatsApp**: no necesitas registrarte. 👀",
        ],
        hint: "¿No ves el botón amarillo? Está justo debajo del título **¿Qué quieres almorzar hoy?**",
        target: "#tour-empezar",
        placement: "bottom",
        advance: "manual",
        cta: "Ver menú ▸",
    },
    {
        id: "card",
        step: 1,
        emoji: "⭐",
        title: "Elige tu plato",
        bullets: [
            "Toca la tarjeta de tu plato favorito (por ejemplo **Pollo guisado — $6.99**).",
            "Se abrirá la ficha con **contornos, bebidas, extras y delivery**.",
            "Verás el **subtotal** actualizarse en tiempo real.",
        ],
        hint: "Si la ficha ya está abierta, solo pulsa **Siguiente**.",
        target: '[data-tour="card"]',
        placement: "right",
        advance: "auto",
        cta: "Siguiente ▸",
        before_show: "scroll_into_view",
        when: (store) => store.modal_on === "SELECTED_PRODUCT",
    },
    {
        id: "contornos",
        step: 2,
        emoji: "🥗",
        title: "Contornos (obligatorio)",
        bullets: [
            "Marca **1, 2 o 3 contornos** (máximo **3**). Están **incluidos** en el precio.",
            "Verás el aviso **Requerido** y el botón **Agregar** apagado hasta elegir al menos uno.",
            "Si un contorno aparece en **gris**, es porque ya tienes los 3 seleccionados.",
            "Al final tienes un campo **Nota** para detallar este plato (sin cebolla, bien cocido…).",
        ],
        hint: "¿Cerraste la ficha? Toca de nuevo cualquier plato para abrirla.",
        target: "#tour-contornos",
        placement: "right",
        advance: "auto",
        cta: "Siguiente ▸",
        before_show: "scroll_into_view",
        when: (store) =>
            store.product_selected.contornos.size >= 1 ||
            store.product_selected.is_product_without_contorno,
    },
    {
        id: "bebidas",
        step: 2,
        emoji: "🥤",
        title: "Bebidas y extras",
        bullets: [
            "En **Bebidas** y **Extras** marca lo que quieras con el checkbox ✅ (tienen precio aparte).",
            "⚠️ Al marcarlo **ya entra a tu pedido**; si lo vuelves a tocar, **se quita**.",
            "Usa las flechas **▲ / ▼** para abrir o cerrar cada sección.",
        ],
        hint: "Las bebidas cuestan desde **$1** (agua) hasta **$3** (jugo de fresa).",
        target: "#tour-bebidas",
        placement: "right",
        advance: "manual",
        cta: "Siguiente ▸",
        before_show: "scroll_into_view",
    },
    {
        id: "delivery",
        step: 2,
        emoji: "🛵",
        title: "Delivery o retiro",
        bullets: [
            "Elige **tu sector**: Centro **$1**, Tipuro / Juanico / Alto los godos **$2**, Zona industrial **$3**.",
            "Solo puede ir **un sector por pedido**.",
            "¿Recoges en el restaurante? **No marques nada** en esta sección.",
        ],
        hint: "Después podrás verificar tu sector en el resumen del pedido.",
        target: "#tour-delivery",
        placement: "right",
        advance: "manual",
        cta: "Siguiente ▸",
        before_show: "scroll_into_view",
    },
    {
        id: "agregar",
        step: 2,
        emoji: "➕",
        title: "Cantidad y agregar",
        bullets: [
            "Ajusta la cantidad con los botones **− / +** (mínimo **1**).",
            "Revisa el **subtotal** y toca el botón amarillo **Agregar**.",
            "El plato se suma a tu pedido y la ficha se cierra sola.",
        ],
        hint: "¿El botón **Agregar** sigue gris? Todavía falta elegir un contorno.",
        target: "#tour-agregar",
        placement: "top",
        advance: "auto",
        cta: "Siguiente ▸",
        before_show: "scroll_into_view",
        when: (store) =>
            store.modal_on === null &&
            store.cart.some((order) => order.product_type === "Plato"),
    },
    {
        id: "mi-pedido",
        step: 3,
        emoji: "🛒",
        title: "Abre tu carrito",
        bullets: [
            "Toca el botón rojo **Mi pedido (n)** de la barra superior: el número muestra tus artículos.",
            "🔝 Si la barra se oculta al bajar, **sube un poco el scroll** y vuelve a aparecer.",
            "También puedes abrirlo aunque esté en **0**.",
        ],
        hint: "El botón tiene un **icono de comida 🍔** y está siempre a la derecha de la barra.",
        target: "#tour-mi-pedido",
        placement: "bottom",
        advance: "auto",
        cta: "Siguiente ▸",
        before_show: "scroll_top",
        when: (store) => store.modal_on === "ORDER_MODAL",
    },
    {
        id: "revisar",
        step: 3,
        emoji: "✅",
        title: "Revisa tu pedido",
        bullets: [
            "Comprueba **cantidades**, **contornos** y el **Total** final.",
            "¿Algo mal? Usa **Editar** o **Eliminar** en cada fila, y cambia cantidades con **− / +**.",
            "Recuerda: **no hay cupones ni registro**.",
        ],
        hint: "Los artículos aparecen ordenados: platos, bebidas, extras y delivery.",
        target: "#tour-total",
        placement: "top",
        advance: "manual",
        cta: "Listo ✓",
        before_show: "scroll_into_view",
    },
    {
        id: "entrega",
        step: 4,
        emoji: "📍",
        title: "Datos de entrega",
        bullets: [
            "**No hay formulario de dirección**: tu entrega es el **sector de Delivery** que elegiste (aparece aquí con su recargo).",
            "¿Retiras en tienda? Simplemente **no verás esta fila**.",
            "La calle, el punto de referencia y el horario los **escribes en WhatsApp** en el paso final.",
        ],
        hint: "¿No ves la fila **Delivery**? Pulsa **Siguiente**; si quieres delivery, cierra y marca tu sector en la ficha del plato.",
        target: "#tour-entrega",
        placement: "top",
        advance: "manual",
        cta: "Siguiente ▸",
        before_show: "scroll_into_view",
    },
    {
        id: "enviar",
        step: 5,
        emoji: "💬",
        title: "Pago y confirmación",
        bullets: [
            "Toca **Enviar pedido**: se abre **WhatsApp** con tu pedido ya escrito.",
            "Confirma tu **dirección exacta** y el **horario**, y acuerda el **pago** allí mismo.",
            "🚫 Si no se abre la pestaña, permite las **ventanas emergentes** del navegador.",
        ],
        hint: "El número de pedidos es el que aparece en WhatsApp (**…2782**).",
        target: "#tour-enviar",
        placement: "top",
        advance: "manual",
        cta: "Finalizar 🎉",
    },
];

const KEY_DONE = "tour_done_v1";
const KEY_SKIPPED = "tour_skipped_v1";

export function useTour() {
    const state = useState<TourState>("tour_state", () => ({
        active: false,
        index: 0,
        stars: 0,
        finished: false,
        baseline_cart: 0,
    }));

    const current_beat = computed<TourBeat | undefined>(
        () => TOUR_BEATS[state.value.index]
    );

    const step = computed(() => current_beat.value?.step ?? 5);

    const progress = computed(() =>
        state.value.finished
            ? 100
            : Math.round(((state.value.index + 1) / TOUR_BEATS.length) * 100)
    );

    function persist(key: string) {
        if (import.meta.client) localStorage.setItem(key, "1");
    }

    function start(baseline_cart: number = 0) {
        state.value.active = true;
        state.value.finished = false;
        state.value.index = 0;
        state.value.stars = 0;
        state.value.baseline_cart = baseline_cart;
    }

    function next() {
        if (state.value.finished) {
            close();
            return;
        }
        if (state.value.index >= TOUR_BEATS.length - 1) {
            finish();
            return;
        }
        state.value.index++;
        state.value.stars = state.value.index;
    }

    function back() {
        if (state.value.index > 0) state.value.index--;
    }

    function skip() {
        state.value.active = false;
        state.value.finished = false;
        persist(KEY_SKIPPED);
    }

    function finish() {
        state.value.stars = TOUR_BEATS.length;
        state.value.finished = true;
        persist(KEY_DONE);
    }

    function close() {
        state.value.active = false;
    }

    function notify(event: string) {
        if (
            event === "send_order" &&
            state.value.active &&
            !state.value.finished &&
            current_beat.value?.id === "enviar"
        ) {
            finish();
        }
    }

    function init_from_storage() {
        if (!import.meta.client) return;
        if (
            localStorage.getItem(KEY_DONE) ||
            localStorage.getItem(KEY_SKIPPED)
        )
            return;
        start(0);
    }

    function was_completed() {
        if (!import.meta.client) return false;
        return !!localStorage.getItem(KEY_DONE);
    }

    return {
        state,
        current_beat,
        step,
        progress,
        start,
        next,
        back,
        skip,
        finish,
        close,
        notify,
        init_from_storage,
        was_completed,
        beats: TOUR_BEATS,
    };
}
