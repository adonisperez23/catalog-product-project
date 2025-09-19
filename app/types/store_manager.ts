import type { Product } from "./Product";
import { ProductOrder } from "./ProductOrder";

export class StoreManager {
    public products: Product[];
    public secondary_products: Product[];
    public cart: ProductOrder[] = [];
    public is_editing_product: boolean = false;

    constructor(products: Product[], secondary_products: Product[]) {
        this.products = products;
        this.secondary_products = secondary_products;
    }

    get totalProducts(): number {
        return this.cart.length;
    }

    get total(): number {
        return this.cart.reduce(
            (total, product) => (total = total + product.sub_total),
            0
        );
    }

    set editProduct(value: boolean) {
        this.is_editing_product = value;
    }

    addProductOrder(new_product: ProductOrder) {
        const existingProductOrder = this.cart.find((item) => {
            return (
                item.product.name === new_product.product.name &&
                this.areSetsEqual(item.contornos, new_product.contornos)
            );
        });

        if (existingProductOrder) {
            // Si el producto ya existe, incrementar su cantidad
            existingProductOrder.addProduct(new_product.amount);
        } else {
            // Si el producto no existe, agregarlo al carrito
            this.cart.push(new_product);
        }
    }

    addSecondaryProductToOrder(new_secondary_product: Product) {
        let new_product_order = new ProductOrder(new_secondary_product);

        const existingProductOrderIndex = this.cart.findIndex(
            (item) => item.product.name === new_product_order.product.name
        );

        if (existingProductOrderIndex !== -1) {
            // Si el producto ya existe, eliminarlo, ya que solo puede haber un solo secondary product por orden pero con diferentes cantidades
            this.cart.splice(existingProductOrderIndex, 1);
        } else {
            // Si el producto no existe, agregarlo al carrito
            this.cart.push(new_product_order);
        }
    }

    deleteProduct(product_index: number) {
        this.cart.splice(product_index, 1);
    }

    getSecondaryProducts(product_type: Product["type"]) {
        return this.secondary_products.filter(
            (product) => product.type === product_type
        );
    }

    editProductOrder(modified_product: ProductOrder, product_index: number) {
        this.cart[product_index] = modified_product;
        this.editProduct = false;
    }

    checkSecondaryProductSelected(secondary_product: Product) {
        return this.cart.some(
            (element) => element.product.name === secondary_product.name
        );
    }

    setMessageOrder() {
        let pedido_ordenado = "";

        this.cart.forEach((product) => {
            pedido_ordenado += `* ${product.product_name} ${
                product.product_type === "Plato" ? "con" : ""
            } ${product.describirContornos()} x ${product.amount} — $${
                product.sub_total
            } \n`;
        });

        return `Hola, buenas tardes. Quiero hacer este pedido:\n\n${pedido_ordenado} \n\nCantidad total de productos: ${this.totalProducts}\nMonto total: $${this.total}\n\nNOTA:\nPor favor espere que su pedido sea verificado. Muchas gracias`;
    }

    getCart() {
        return this.cart.sort((a) => {
            if (a.product_type === "Plato") return -1;
            else return 1;
        });
    }

    areSetsEqual<T>(setA: Set<T>, setB: Set<T>): boolean {
        // 1. Verificar si tienen el mismo tamaño
        if (setA.size !== setB.size) {
            return false;
        }

        // 2. Iterar sobre un conjunto y verificar la presencia de cada elemento en el otro
        for (const item of setA) {
            if (!setB.has(item)) {
                return false;
            }
        }

        // 3. Si se superan ambas verificaciones, los conjuntos son iguales
        return true;
    }
}
