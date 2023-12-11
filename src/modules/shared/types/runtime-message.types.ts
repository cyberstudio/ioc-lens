import uniqueId from 'lodash/uniqueId';

export const createRuntimeRequestMessage = <N extends string, P>(name: N, payload: P): RuntimeRequestMessage<N, P> => ({
    type: 'RuntimeRequest',
    name,
    requestId: generateRequestId(),
    payload
});

export const createRuntimeCancelRequestMessage = (requestId: string): RuntimeCancelRequestMessage => ({
    type: 'CancelRuntimeRequest',
    requestId,
    payload: null as unknown as never
});

export const createRuntimeResponseMessage = <P>(requestId: string, payload: P): RuntimeResponseMessage<P> => ({
    type: 'RuntimeResponse',
    requestId,
    payload
});

const generateRequestId = (): string => {
    return `${uniqueId('runtime-request-')}--${new Date().getTime().toString()}`;
};

export interface RuntimeMessage<T, P> {
    type: T;
    payload: P;
}

export interface RuntimeRequestMessage<RequestName extends string | unknown, P>
    extends RuntimeMessage<'RuntimeRequest', P> {
    name: RequestName;
    requestId: string;
    payload: P;
}

export interface RuntimeCancelRequestMessage extends RuntimeMessage<'CancelRuntimeRequest', never> {
    requestId: string;
}

export interface RuntimeResponseMessage<P> extends RuntimeMessage<'RuntimeResponse', P> {
    requestId: string;
    payload: P;
}
