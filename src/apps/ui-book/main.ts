import { Component, renderComponent } from '../../modules/shared/utils';
import { IUIBookExample } from './utils';

import './styles/main.css';

class UIBookPage extends Component<{ examples: IUIBookExample[] }> {
    render(): HTMLElement {
        this.el = document.createElement('div');

        this.el.innerHTML = `
            <h1 class="headline">IoC Lens UI Book</h1>
        `;

        this.props.examples.forEach((e) => {
            this.renderExample(e);
        });

        return this.el;
    }

    private renderExample(e: IUIBookExample): void {
        const titleEl = document.createElement('h2');

        titleEl.classList.add('title');
        titleEl.textContent = e.title;

        const componentEl = e.content.render();

        this.el?.appendChild(titleEl);
        this.el?.appendChild(componentEl);
    }
}

const examples: IUIBookExample[] = [];

const page = new UIBookPage({ examples });

renderComponent(document.querySelector<HTMLElement>('#app'), page);
