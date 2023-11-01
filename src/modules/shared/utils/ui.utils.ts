export abstract class Component<Props> {
    protected el: HTMLElement | null = null;

    private subscriptions: (() => void)[] = [];

    constructor(protected props: Props) {}

    abstract render(): HTMLElement;

    destroy(): void {
        if (this.el) {
            this.unsubscribe();
            this.el.remove();
            this.el = null;
        }
    }

    protected unsubscribe(): void {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.subscriptions = [];
    }

    protected on<K extends keyof HTMLElementEventMap>(
        el: HTMLElement,
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
        options?: boolean | AddEventListenerOptions
    ): () => void {
        el.addEventListener(type, listener, options);

        const unsubscribe = () => el.removeEventListener(type, listener);

        this.subscriptions.push(unsubscribe);

        return () => {
            unsubscribe();

            this.subscriptions = this.subscriptions.filter((u) => u !== unsubscribe);
        };
    }
}

export const renderComponent = <Props>(container: HTMLElement | null, component: Component<Props>): void => {
    const componentEl = component.render();

    if (container && componentEl) {
        container.appendChild(componentEl);
    }
};
