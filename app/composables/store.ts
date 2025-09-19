import { StoreManager } from "~/types/store_manager";

export const useStore = () =>
    useState<StoreManager>(
        "store",
        () =>
            new StoreManager(
                [
                    {
                        name: "Lomito con pimenton",
                        price: 12,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/lomito-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/lomito.avif",
                    },
                    {
                        name: "Costillas de cochino fritas",
                        price: 12,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/3_costillas%20de%20cochino%20fritas-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/3_costillas%20de%20cochino%20fritas.avif",
                    },
                    {
                        name: "Filet de pollo",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/4_filet%20de%20pollo-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/4_filet%20de%20pollo.avif",
                    },
                    {
                        name: "Asado negro",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/5_asado%20negro-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/5_asado%20negro.avif",
                    },

                    {
                        name: "Lengua en salsa",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/8_lengua%20en%20salsa-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/8_lengua%20en%20salsa.avif",
                    },
                    {
                        name: "Costillas guisadas",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/9_costillas%20guisadas-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/9_costillas%20guisadas.avif",
                    },

                    {
                        name: "Callos madrileños",
                        price: 12,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/callos-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/callos.avif",
                    },
                    {
                        name: "Bistec de solomo",
                        price: 10,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/12_bistec%20de%20solomo-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/12_bistec%20de%20solomo.avif",
                    },
                    {
                        name: "Filet de cochino",
                        price: 8,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/filet+de+cochino-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/filet+de+cochino.avif",
                    },
                    {
                        name: "Bistec de higado encebollado",
                        price: 8,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/14_bistec%20de%20higado-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/14_bistec%20de%20higado.avif",
                    },
                    {
                        name: "Rabo en salsa",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/10_rabo%20en%20salsa-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/10_rabo%20en%20salsa.avif",
                    },
                    {
                        name: "Pabellon criollo a caballo",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/7_pabellon%20criollo%20a%20caballo-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/7_pabellon%20criollo%20a%20caballo.avif",
                    },
                    {
                        name: "Milanesa de pollo",
                        price: 9,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/6_milanesa%20de%20pollo-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/6_milanesa%20de%20pollo.avif",
                    },
                    {
                        name: "Pasta a la bologna",
                        price: 8,
                        type: "Plato",
                        img_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/1_pasta%20a%20la%20bologna-min.png",
                        img_avif_url:
                            "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/1_pasta%20a%20la%20bologna.avif",
                    },
                ],
                [
                    { name: "Arroz", price: 0, type: "Contorno" },
                    { name: "Pasta", price: 0, type: "Contorno" },
                    { name: "Ensalada cocida", price: 0, type: "Contorno" },
                    { name: "Ensalada verde", price: 0, type: "Contorno" },
                    { name: "Pure de papa", price: 0, type: "Contorno" },
                    { name: "Papas al vapor", price: 0, type: "Contorno" },
                    { name: "Papa frita", price: 0, type: "Contorno" },
                    { name: "tajadas fritas", price: 0, type: "Contorno" },
                    { name: "Caraotas negras", price: 0, type: "Contorno" },
                    { name: "frijoles", price: 0, type: "Contorno" },
                    { name: "Agua mineral 355ml", price: 1, type: "Bebida" },
                    { name: "Jugo de parchita", price: 2, type: "Bebida" },
                    { name: "Jugo de guayaba", price: 2, type: "Bebida" },
                    { name: "Jugo de lechoza", price: 2, type: "Bebida" },
                    { name: "Jugo de fresa", price: 3, type: "Bebida" },
                    { name: "Racion de papas fritas", price: 3, type: "Extra" },
                    { name: "Sector Centro", price: 2, type: "Delivery" },
                    { name: "Sector Tipuro", price: 3, type: "Delivery" },
                    { name: "Zona industrial", price: 3, type: "Delivery" },
                    { name: "Sector Juanico", price: 2, type: "Delivery" },
                ]
            )
    );
