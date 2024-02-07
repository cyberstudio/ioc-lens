import { initKbqTitle } from '../../directives';
import { Component } from '../../utils';

import './link.component.css';

interface RegularLinkProps {
    type: 'regular';
    text: string;
    href: string;
}

interface PseudoLinkProps {
    type: 'pseudo';
    text: string;
    onClick: (event: Event) => void;
}
type LinkProps = RegularLinkProps | PseudoLinkProps;

export class LinkComponent extends Component<LinkProps> {
    protected createComponent() {
        const el = this.parseTemplate('<a class="kbq-link kbq-typography-caption"></a>');
        initKbqTitle(el);

        el.textContent = this.props.text;

        if (this.props.type === 'regular') {
            el.setAttribute('href', this.props.href);
            el.setAttribute('target', '_blank');
        } else {
            this.on(el, 'click', this.props.onClick);
            el.classList.add('kbq-link--pseudo');
        }

        return el;
    }
}
