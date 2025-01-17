import { useRef, useState, useLayoutEffect } from 'react';

import IField from '../model/IField';

import initialValue from '../config/initialValue';
import isStatefull from '../config/isStatefull';

import deepCompare from '../utils/deepCompare';
import deepClone from '../utils/deepClone';
import deepFlat from '../utils/deepFlat';
import assign from '../utils/deepMerge';
import create from '../utils/create';

import objects from '../utils/objects';
import set from '../utils/set';
import get from '../utils/get';

import IAnything from '../model/IAnything';
import { PickProp } from '../model/IManaged';
import IOneProps from '../model/IOneProps';

interface IResolvedHookProps<Data = IAnything> {
    handler: PickProp<IOneProps<Data>, 'handler'>;
    fallback: PickProp<IOneProps<Data>, 'fallback'>;
    fields: PickProp<IOneProps<Data>, 'fields'>;
    roles: PickProp<IOneProps<Data>, 'roles'>;
    change: PickProp<IOneProps<Data>, 'change'>;
}

const buildObj = <Data = IAnything>(fields: IField<Data>[], roles?: string[]) => {
    const obj = {};
    if (fields) {
        deepFlat(fields)
            .filter((field) => !roles || !field.roles || field.roles.find((role) => roles.includes(role)))
            .forEach((f) => {
                if (isStatefull(f as IField)) {
                    create(obj, f.name);
                    if (typeof f.defaultValue === 'undefined') {
                        set(obj, f.name, get(obj, f.name) || initialValue(f.type));
                    } else {
                        set(obj, f.name, f.defaultValue);
                    }
                }
            });
    }
    return obj;
};

/**
 * Хук разрешает обработчик на корневом уровне, при чем только
 * один раз. Для дочерних One компонентов осуществляется
 * подписка на изменения
 */
export const useResolved = <Data = IAnything>({
    handler,
    fallback,
    fields,
    roles,
    change,
}: IResolvedHookProps<Data>): [Data | null, (v: Data) => void] => {
    const [data, setData] = useState<Data | null>(null);
    const isMounted = useRef(true);
    const isRoot = useRef(false);
    useLayoutEffect(() => {
        const tryResolve = async () => {
            if (isRoot.current) {
                return
            } else if (typeof handler === 'function') {
                try {
                    const result = (handler as Function)();
                    if (result instanceof Promise) {
                        const newData = objects(assign({}, buildObj<Data>(fields, roles), deepClone(await result)));
                        change!(newData, true);
                        isMounted.current && setData(newData);
                    } else {
                        const newData = objects(assign({}, buildObj<Data>(fields, roles), deepClone(result)));
                        change!(newData, true);
                        isMounted.current && setData(newData);
                    }
                } catch (e) {
                    if (fallback) {
                        fallback(e as Error);
                    } else {
                        throw e;
                    }
                } finally {
                    isRoot.current = true;
                }
            } else if (!deepCompare(data, handler)) {
                isMounted.current && setData(objects(assign({}, buildObj(fields, roles), handler)));
            }
        };
        tryResolve();
    }, [handler]);
    useLayoutEffect(() => () => {
        isMounted.current = false;
    }, []);
    return [data, setData];
};

export default useResolved;
