export abstract class Component<Props> {
    protected el: HTMLElement | null = null;

    private subscriptions: (() => void)[] = [];
    private innerComponents: Component<unknown>[] = [];

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
            this.destroyInnerComponents();

            this.unsubscribe();
            this.el.remove();
            this.el = null;
        }
    }

    protected abstract createComponent(): HTMLElement;

    protected registerInnerComponent(c: Component<unknown>): void {
        if (!this.innerComponents.includes(c)) {
            this.innerComponents.push(c);
        }
    }

    protected renderContent(root: HTMLElement | null, content: string | HTMLElement | Component<unknown> | null): void {
        if (!root || !content) {
            return;
        }

        if (content instanceof Component) {
            this.registerInnerComponent(content);

            renderComponent(root, content);
        } else if (content instanceof HTMLElement) {
            root.appendChild(content);
        } else {
            root.textContent = content;
        }
    }

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

    private destroyInnerComponents(): void {
        this.innerComponents.forEach((c) => {
            if (c instanceof Component) {
                c.destroy();
            }
        });

        this.innerComponents = [];
    }
}

export const renderComponent = <Props>(container: HTMLElement | null, component: Component<Props>): void => {
    const componentEl = component.render();

    if (container && componentEl) {
        container.appendChild(componentEl);
    }
};
