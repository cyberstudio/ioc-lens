import { Component } from '../../../../shared/utils';

import './entity-info-slot.component.css';

export class EntityInfoSlot extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-info-slot"></div>');

        return el;
    }
}
