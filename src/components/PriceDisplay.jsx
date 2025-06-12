const formatNumberWithSubscript = (value) => {
    const stringValue = typeof value === 'number' ? value.toFixed(10) : value;
    const match = stringValue.match(/^(\$?0\.)(0+)(\d+)$/);
    if (!match) return stringValue;

    const prefix = match[1];
    const zeros = match[2];
    const number = match[3];

    return (
        <>
            {prefix}
            <sub>{zeros.length}</sub>
            {number}
        </>
    );
};

export const PriceDisplay = ({ value }) => {
    return (
        <span>
      {formatNumberWithSubscript(value)}
    </span>
    );
};
