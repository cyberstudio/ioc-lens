import {
    valueWithConfidenceComponentExample,
    entityAttributeValueComponentExample,
    entityAttributesComponentExample,
    entityInfoComponentExample,
    entityInfoPopupComponentExample
} from '../../modules/features/entity-info/components';
import {
    alertExample,
    badgeExample,
    buttonComponentExample,
    inputFieldComponentExample,
    linkComponentExample,
    popupComponentExample,
    progressSpinnerComponentExample,
    propertyRowComponentExample,
    toggleFieldComponentExample,
    tooltipComponentExample
} from '../../modules/shared/components';
import { mockChromeI18nAdapter } from '../../modules/shared/mocks';
import { Component, renderComponent, UIBookExample } from '../../modules/shared/utils';

import './styles/main.css';

class UIBookPage extends Component<{ examples: UIBookExample[] }> {
    createComponent(): HTMLElement {
        const el = document.createElement('div');

        el.innerHTML = `
            <h1 class="kbq-typography-headline">IoC Lens UI Book</h1>
        `;

        this.props.examples.forEach((e) => {
            this.renderExample(el, e);
        });

        return el;
    }

    private renderExample(root: HTMLElement, e: UIBookExample): void {
        const titleEl = document.createElement('h2');

        titleEl.classList.add('kbq-typography-title');
        titleEl.textContent = e.title;

        const componentEl = e.content.render();

        root.appendChild(titleEl);
        root.appendChild(componentEl);
    }
}

const examples: UIBookExample[] = [
    badgeExample,
    buttonComponentExample,
    inputFieldComponentExample,
    linkComponentExample,
    popupComponentExample,
    progressSpinnerComponentExample,
    propertyRowComponentExample,
    toggleFieldComponentExample,
    tooltipComponentExample,
    alertExample,
    valueWithConfidenceComponentExample,
    entityAttributeValueComponentExample,
    entityAttributesComponentExample,
    entityInfoComponentExample,
    entityInfoPopupComponentExample
];

mockChromeI18nAdapter();

const page = new UIBookPage({ examples });

renderComponent(document.querySelector<HTMLElement>('#app'), page);
