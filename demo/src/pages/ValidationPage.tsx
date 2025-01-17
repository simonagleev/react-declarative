import { Fragment, useState } from 'react';

import { Email } from '@mui/icons-material';

import { OneTyped, FieldType, TypedField, IOption, Breadcrumbs } from 'react-declarative';

import Logger from '../components/Logger';

const fields: TypedField<IOneData>[] = [
    {
        type: FieldType.Text,
        inputType: 'email',
        inputAutocomplete: 'on',
        name: 'email',
        title: 'Email',
        trailingIcon: Email,
        // defaultValue: 'tripolskypetr@gmail.com',
        isInvalid({email}) {
            const expr = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!expr.test(email)) {
                return 'Invalid email address';
            } else {
                return null;
            }
        },
        isDisabled({disabled}) {
            return disabled;
        },
        isVisible({visible}) {
            return visible;
        }
    },
    {
        type: FieldType.Fragment,
        isVisible({visible}) {
            return visible;
        },
        fields: [
            {
                type: FieldType.Text,
                name: 'number',
                title: 'Number',
                description: 'Only number allowed',
                isInvalid({number}) {
                    if (isNaN(number as any) || number === '') {
                        return 'It is not a number';
                    }
                    return null;
                },
            },
        ],
    },
    {
        type: FieldType.Expansion,
        title: 'Settings',
        description: 'Hide or disable',
        fields: [
            {
                type: FieldType.Switch,
                title: 'Mark as visible',
                name: 'visible',
                defaultValue: true,
            },
            {
                type: FieldType.Switch,
                title: 'Mark as disabled',
                name: 'disabled',
            },
        ],
    },
];

const actions: IOption[] = [
    {
        label: 'Sample action',
        action: 'sample-action',
    }
];

interface IOneData {
    disabled: boolean;
    visible: boolean;
    number: string;
    name: string;
    email: string;
}

export const ValidationPage = () => {
    const [data, setData] = useState(null);
    const invalidity = () => setData(null);
    const change = (newData: any, initialChange: boolean) => {
        if (!initialChange) {
            setData(newData);
        }
    };
    const action = (action: string) => alert(action); 
    const save = () => setData(null);
    return (
        <Fragment>
            <Breadcrumbs onSave={save} onAction={action} disabled={!data} actions={actions} />
            <OneTyped<IOneData>
                fields={fields}
                change={change}
                invalidity={invalidity} 
            />
            <Logger {...(data || {})} />
        </Fragment>
    );
};

export default ValidationPage;
