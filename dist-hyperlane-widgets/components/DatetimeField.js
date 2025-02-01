import React from 'react';
export function DatetimeField({ className, timestamp, onChange, name }) {
    const handleChange = (e) => {
        if (!e.target['validity'].valid) {
            onChange(null);
        }
        else {
            const datetime = e.target['value'] + ':00Z';
            const newTimestamp = new Date(datetime).getTime();
            onChange(newTimestamp);
        }
    };
    return (React.createElement("input", { type: "datetime-local", value: toShortIsoString(timestamp), onChange: handleChange, name: name, className: className }));
}
function toShortIsoString(timestamp) {
    if (!timestamp)
        return '';
    // Trim milliseconds and timezone to match input field format
    return new Date(timestamp).toISOString().split('.')[0];
}
//# sourceMappingURL=DatetimeField.js.map