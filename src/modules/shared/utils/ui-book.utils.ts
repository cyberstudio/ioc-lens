import { Component } from './ui.utils';

export interface UIBookExample<ComponentProps = unknown> {
    title: string;
    content: Component<ComponentProps>;
}

export const createExample = <ComponentProps = unknown>(
    title: string,
    content: Component<ComponentProps>
): UIBookExample<ComponentProps> => ({
    title,
    content
});
