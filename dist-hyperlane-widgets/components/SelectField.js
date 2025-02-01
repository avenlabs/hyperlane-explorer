import React from 'react';
export function SelectField({ options, value, onValueSelect, classes, ...passThruProps }) {
    const onChangeSelect = (event) => {
        onValueSelect(event?.target?.value || '');
    };
    return (React.createElement("select", { className: `htw-rounded htw-border htw-border-gray-400 htw-bg-transparent htw-px-2 htw-py-1 htw-text-sm htw-font-light invalid:htw-text-gray-400 ${classes || ''}`, ...passThruProps, value: value, onChange: onChangeSelect }, options.map((o, i) => (React.createElement("option", { key: `option-${i}`, value: o.value }, o.display)))));
}
//# sourceMappingURL=SelectField.js.map