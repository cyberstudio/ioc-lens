import { Component } from '../../utils';

import './property-row.component.css';

interface PropertyRowProps {
    title: string;
    content: string | HTMLElement | Component<unknown>;
    hasTitleNote?: boolean;
}

export class PropertyRowComponent extends Component<PropertyRowProps> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <div class="kbq-property-row kbq-typography-text-normal">
                <div class="kbq-property-row__header ${
                    this.props.hasTitleNote ? 'kbq-property-row__header--with-note' : ''
                }"></div>
                <div class="kbq-property-row__body"></div>
            </div>
        `);

        this.renderContent(el.querySelector('.kbq-property-row__header'), this.props.title);
        this.renderContent(el.querySelector('.kbq-property-row__body'), this.props.content);

        return el;
    }
}
