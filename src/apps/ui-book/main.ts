import { badgeExample, buttonComponentExample, tooltipComponentExample } from '../../modules/shared/components';
import { Component, renderComponent, UIBookExample } from '../../modules/shared/utils';

import './styles/main.css';

class UIBookPage extends Component<{ examples: UIBookExample[] }> {
    createComponent(): HTMLElement {
        const el = document.createElement('div');

        el.innerHTML = `
            <h1 class="headline">IoC Lens UI Book</h1>
        `;

        this.props.examples.forEach((e) => {
            this.renderExample(el, e);
        });

        return el;
    }

    private renderExample(root: HTMLElement, e: UIBookExample): void {
        const titleEl = document.createElement('h2');

        titleEl.classList.add('title');
        titleEl.textContent = e.title;

        const componentEl = e.content.render();

        root.appendChild(titleEl);
        root.appendChild(componentEl);
    }
}

const examples: UIBookExample[] = [badgeExample, buttonComponentExample, tooltipComponentExample];

const page = new UIBookPage({ examples });

renderComponent(document.querySelector<HTMLElement>('#app'), page);
