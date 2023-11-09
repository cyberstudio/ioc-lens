import { Component } from '../../utils';

import './progress-spinner.component.css';

interface ProgressSpinnerProps {
    size?: 'compact' | 'big';
}

export class ProgressSpinnerComponent extends Component<ProgressSpinnerProps> {
    private get size(): ProgressSpinnerProps['size'] {
        return this.props.size || 'compact';
    }

    private get svgCircleRadius(): string {
        return this.size === 'compact' ? '42.5%' : '47%';
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <div class="kbq-progress-spinner kbq-progress-spinner--${this.size}">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                    <circle cx="50%"
                            cy="50%"
                            stroke-linecap="round"
                            r="${this.svgCircleRadius}"
                            class="kbq-progress-spinner__circle">
                    </circle>
                </svg>
            </div>
        `);

        return el;
    }
}
