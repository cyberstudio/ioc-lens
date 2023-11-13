import { PropertyRowComponent } from './property-row.component';
import { Component, createExample, renderComponent } from '../../utils';

import './property-row.example.component.css';

class PropertyRowExampleContentComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        return this.parseTemplate('<span>Контент в виде самостоятельного компонента</span>');
    }
}

class PropertyRowExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-property-row-example"></div>');

        const variants = [
            new PropertyRowComponent({
                title: 'Заголовок',
                content: 'Текстовый контент'
            }),

            new PropertyRowComponent({
                title: 'Заголовок',
                content:
                    'Текстовый контент в несколько строк: Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'
            }),

            new PropertyRowComponent({
                title: 'Заголовок в несколько строк',
                content: 'Текстовый контент'
            }),

            new PropertyRowComponent({
                title: 'Заголовок',
                content: this.parseTemplate('<b>Контент в виде HTML</b>')
            }),

            new PropertyRowComponent({
                title: 'Заголовок',
                content: new PropertyRowExampleContentComponent()
            })
        ];

        const variantsWrapper = this.parseTemplate('<div class="kbq-property-row-example__row"></div>');

        variants.forEach((v) => renderComponent(variantsWrapper, v));

        el.appendChild(variantsWrapper);

        return el;
    }
}

export const propertyRowComponentExample = createExample('Property row', new PropertyRowExampleComponent());
