import { BadgeComponent } from './badge.component';
import { Component, createExample, renderComponent } from '../../utils';

import './badge.example.component.css';

class BadgeExampleComponent extends Component<void> {
    protected createComponent() {
        const el = this.parseTemplate('<div class="kbq-badge-example"></div>');
        const badgesFilledElement = el.appendChild(document.createElement('div'));
        const badgesOutlineElement = el.appendChild(document.createElement('div'));

        badgesFilledElement.classList.add('kbq-badge-example__row');
        badgesOutlineElement.classList.add('kbq-badge-example__row');

        const filledBadges = [
            new BadgeComponent({
                style: 'contrast',
                fill: 'filled',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'dark',
                fill: 'filled',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'error',
                fill: 'filled',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'warning-on',
                fill: 'filled',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'warning-off',
                fill: 'filled',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'success',
                fill: 'filled',
                content: 'Новый'
            })
        ];

        const outlineBadges = [
            new BadgeComponent({
                style: 'contrast',
                fill: 'outline',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'error',
                fill: 'outline',
                content: 'Новый'
            }),
            new BadgeComponent({
                style: 'warning',
                fill: 'outline',
                content: 'Новый'
            })
        ];

        filledBadges.forEach((c) => renderComponent(badgesFilledElement, c));
        outlineBadges.forEach((c) => renderComponent(badgesOutlineElement, c));

        return el;
    }
}

export const badgeExample = createExample('Badge', new BadgeExampleComponent());
