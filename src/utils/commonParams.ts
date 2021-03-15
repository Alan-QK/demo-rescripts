export const WeightUnits = (t) => [
    { key: 'GRAM', label: t('common:units.weight.gram') },
    { key: 'KILOGRAM', label: t('common:units.weight.kilogram') },
    { key: 'OUNCE', label: t('common:units.weight.ounce') },
    { key: 'POUND', label: t('common:units.weight.pound') },
];

export const SizeUnits = (t) => [
    { key: 'MILLIMETER', label: t('common:units.size.millimeter') },
    { key: 'CENTIMETER', label: t('common:units.size.centimeter') },
    { key: 'METER', label: t('common:units.size.meter') },
    { key: 'INCH', label: t('common:units.size.inch') },
    { key: 'FOOT', label: t('common:units.size.foot') },
];

export const PriceUnits = (t) => [
    { key: 'USD', label: t('common:units.price.USD'), sn: '$' },
    { key: 'RMB', label: t('common:units.price.RMB'), sn: '￥' },
    { key: 'CNY', label: t('common:units.price.CNY'), sn: '￥' },
];

export const RateMaps = {
    base: ['基础费', 'USD'],
    fuel: ['燃油附加费', '%'],
    fuel_floating: ['浮动燃油费', 'USD'],
    base_amount: ['基础金额', 'USD'],
    base_surcharge: ['基础百分比', '%'],
    interval_amount: ['间隔金额', 'USD'],
    interval_surcharge: ['间隔百分比', '%'],
    amount: ['金额', 'USD'],
    start: ['开始时间', '--'],
    end: ['结束时间', '--'],
    peak: ['旺季附加费', 'USD'],
    area: ['地区', '--'],
    large_package: ['超大件', '--'],
    additional: ['额外操作', '--'],
    options: ['其他费用', '--'],
    peak_additional: ['额外操作旺季附加费', 'USD'],
    peak_large: ['超大件操作旺季附加费', 'USD'],
    peak_limit: ['超过限制旺季附加费', 'USD'],
    length: ['超长额外操作附加费', 'USD'],
    width: ['超宽额外操作附加费', 'USD'],
    length_plus_girth: ['超周长额外操作附加费', 'USD'],
    length_and_girth: ['超长度和周长尺寸额外操作附加费', 'USD'],
    'additional.weight': ['额外操作费-重量（lb）', ''],
    'large_package.weight': ['超大件附加费-重量（lb）', ''],
    'over_limit.weight': ['超过最大限制附加费-重量（lb）', ''],
    irregular: ['非传统或不规则形状的容器额外操作附加费', 'USD'],
    large_residential: ['超大件宅配附加费', 'USD'],
    large_commercial: ['超大件宅配附加费', 'USD'],
    residential: ['宅配附加费', 'USD'],
    commercial: ['商配附加费', 'USD'],
    das_residential: ['DAS特定地区宅配附加费', 'USD'],
    das_commercial: ['DAS特定地区商配附加费', 'USD'],
    e_das_residential: ['E_DAS特定地区宅配附加费', 'USD'],
    e_das_commercial: ['E_DAS特定地区商配附加费', 'USD'],
    ak: ['Alaska偏远地区配送附加费', 'USD'],
    hi: ['Hawaii偏远地区配送附加费', 'USD'],
    in_hi: ['Intra-Hawaii偏远地区配送附加费', 'USD'],
    adult_signature: ['成人签收附加费', 'USD'],
    direct_signature: ['直接签收附加费', 'USD'],
    indirect_signature: ['间接签收附加费', 'USD'],
    insurance: ['保险费附加费系数', ''],
    intercept: ['配送拦截附加费', 'USD'],
    hazardous: ['危险品附加费', 'USD'],
    address_correction: ['改地址附加费', 'USD'],
    undeliverable: ['逆向返回原发货地址费用，与正向发货费一致', 'USD'],
    over_limit: ['超过最大限制', 'USD'],
    change_order: ['换单费', 'USD'],
    minimum_insurance: ['最低保险费', 'USD'],
};
