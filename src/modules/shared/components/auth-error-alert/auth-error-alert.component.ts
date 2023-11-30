import { AlertComponent } from '../alert';
import { LinkComponent } from '../link';
import { TranslateService } from '../../services';
import { AuthFailureState } from '../../stores';
import { Component } from '../../utils';

interface AuthErrorAlertProps {
    error: AuthFailureState['error'];
    onGoToSettings: () => void;
    onRefreshAuth: () => void;
}

export class AuthErrorAlertComponent extends Component<AuthErrorAlertProps> {
    constructor(
        props: AuthErrorAlertProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        return this.createAlert(this.props.error).render();
    }

    private createAlert(error: AuthFailureState['error']): AlertComponent {
        switch (error) {
            case 'UnknownSettings': {
                return new AlertComponent({
                    text: this.translateService.translate('Auth_Error_Text_UnknownSettings'),
                    action: new LinkComponent({
                        type: 'pseudo',
                        text: this.translateService.translate('Auth_Error_Button_GoToSettings'),
                        onClick: () => this.props.onGoToSettings()
                    })
                });
            }

            case 'UnknownApiKey': {
                return new AlertComponent({
                    text: this.translateService.translate('Auth_Error_Text_UnknownApiKey'),
                    action: new LinkComponent({
                        type: 'pseudo',
                        text: this.translateService.translate('Auth_Error_Button_ReplaceKey'),
                        onClick: () => this.props.onGoToSettings()
                    })
                });
            }

            case 'Forbidden': {
                return new AlertComponent({
                    text: this.translateService.translate('Auth_Error_Text_Forbidden'),
                    action: new LinkComponent({
                        type: 'pseudo',
                        text: this.translateService.translate('Auth_Error_Button_ReplaceKey'),
                        onClick: () => this.props.onGoToSettings()
                    })
                });
            }

            default: {
                return new AlertComponent({
                    text: this.translateService.translate('Common_Error_Text_Loading'),
                    action: new LinkComponent({
                        type: 'pseudo',
                        text: this.translateService.translate('Common_Error_Button_Retry'),
                        onClick: () => this.props.onRefreshAuth()
                    })
                });
            }
        }
    }
}
