export abstract class Component<Props> {
    protected el: HTMLElement | null = null;

    private subscriptions: (() => void)[] = [];

    constructor(protected props: Props) {}

    render(): HTMLElement {
        if (this.el) {
            return this.el;
        }

        this.el = this.createComponent();

        return this.el;
    }

    destroy(): void {
        if (this.el) {
            this.unsubscribe();
            this.el.remove();
            this.el = null;
        }
    }

    protected abstract createComponent(): HTMLElement;

    protected parseTemplate(template: string): HTMLElement {
        return new DOMParser().parseFromString(template, 'text/html').body.firstChild as HTMLElement;
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

    protected globalOn<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => void,
        options?: boolean | AddEventListenerOptions
    ): () => void {
        window.addEventListener(type, listener, options);

        const unsubscribe = () => window.removeEventListener(type, listener);

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
