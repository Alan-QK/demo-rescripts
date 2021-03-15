import { WeightUnits, SizeUnits, PriceUnits } from 'utils/commonParams';
import { isArray } from 'lodash';
import isNumber from 'lodash/isNumber';

const UnitComp = ({ val, unit }) => (
    <span>
        {val}
        {unit ? <span className="c-disable">({unit})</span> : ''}
    </span>
);

const formatV = (val) => {
    return isNumber(val - 0) ? val - 0 : val;
};

export const Price = ({ t, val, unit = '' }) => {
    if (!val) return null;
    const v = formatV(val);
    const u = PriceUnits(t)?.find((i) => i.key === unit)?.sn || '$';
    return (
        <span>
            {u}
            {v}
        </span>
    );
};

export const Size = ({ t, val, unit = '' }) => {
    if (val === undefined) return null;
    let v;
    if (isArray(val)) {
        v = val.map((i) => formatV(i)).join('/');
    } else {
        v = formatV(val);
    }
    const u = SizeUnits(t)?.find((i) => i.key === unit)?.label || unit;
    return <UnitComp val={v} unit={u} />;
};

export const Weight = ({ t, val, unit = '' }) => {
    if (!val) return null;
    const v = formatV(val);
    const u = WeightUnits(t)?.find((i) => i.key === unit)?.label || unit;
    return <UnitComp val={v} unit={u} />;
};

export default {
    Price,
    Weight,
    Size,
};
