import { Component } from '../../modules/shared/utils';

export interface IUIBookExample<ComponentProps = unknown> {
    title: string;
    content: Component<ComponentProps>;
}

export const createExample = <ComponentProps = unknown>(
    title: string,
    content: Component<ComponentProps>
): IUIBookExample<ComponentProps> => ({
    title,
    content
});
