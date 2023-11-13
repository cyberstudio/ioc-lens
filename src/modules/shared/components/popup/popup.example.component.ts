import { Component, createExample, renderComponent } from '../../utils';
import { PopupComponent } from './popup.component';

import './popup.example.component.css';

class PopupExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-popup-example"></div>');

        const variants = [
            new PopupComponent({
                hasHeaderDivider: true,
                headerContent: this.parseTemplate('<span class="subheading">IoC Lens</span>'),
                bodyContent: this.parseTemplate('<span class="small-text">Нет данных об объекте</span>'),
                onClose: () => console.log('close')
            }),

            new PopupComponent({
                hasHeaderDivider: true,
                headerContent: this.parseTemplate('<span class="subheading">IoC Lens</span>'),
                bodyContent: this.parseTemplate(`
                    <div>
                        <h1 class="subheading">Окно с прокруткой</h1>
                        <span class="small-text">
                            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                            <br />
                            <br />
                            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                        </span>
                    </div>
                `),
                onClose: () => console.log('close')
            })
        ];

        variants.forEach((v) => {
            const wrapper = this.parseTemplate('<div class="kbq-popup-example__row"></div>');

            renderComponent(wrapper, v);

            el.appendChild(wrapper);
        });

        return el;
    }
}

export const popupComponentExample = createExample('Popup', new PopupExampleComponent());
