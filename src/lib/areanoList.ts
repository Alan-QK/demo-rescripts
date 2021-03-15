const areas = [
    { id: 100006, code: '+244', en: 'Angola', cn: '安哥拉', ab: 'AO' },
    { id: 100007, code: '+93', en: 'Afghanistan', cn: '阿富汗', ab: 'AF' },
    { id: 100008, code: '+355', en: 'Albania', cn: '阿尔巴尼亚', ab: 'AL' },
    { id: 100009, code: '+213', en: 'Algeria', cn: '阿尔及利亚', ab: 'DZ' },
    { id: 100010, code: '+376', en: 'Andorra', cn: '安道尔共和国', ab: 'AD' },
    { id: 100011, code: '+1264', en: 'Anguilla', cn: '安圭拉岛', ab: 'AI' },
    { id: 100012, code: '+1268', en: 'Antigua and Barbuda', cn: '安提瓜和巴布达', ab: 'AG' },
    { id: 100013, code: '+54', en: 'Argentina', cn: '阿根廷', ab: 'AR' },
    { id: 100014, code: '+374', en: 'Armenia', cn: '亚美尼亚', ab: 'AM' },
    { id: 100015, code: '+247', en: 'Ascension', cn: '阿森松', ab: '' },
    { id: 100016, code: '+61', en: 'Australia', cn: '澳大利亚', ab: 'AU' },
    { id: 100017, code: '+43', en: 'Austria', cn: '奥地利', ab: 'AT' },
    { id: 100018, code: '+994', en: 'Azerbaijan', cn: '阿塞拜疆', ab: 'AZ' },
    { id: 100019, code: '+1242', en: 'Bahamas', cn: '巴哈马', ab: 'BS' },
    { id: 100020, code: '+973', en: 'Bahrain', cn: '巴林', ab: 'BH' },
    { id: 100021, code: '+880', en: 'Bangladesh', cn: '孟加拉国', ab: 'BD' },
    { id: 100022, code: '+1246', en: 'Barbados', cn: '巴巴多斯', ab: 'BB' },
    { id: 100023, code: '+375', en: 'Belarus', cn: '白俄罗斯', ab: 'BY' },
    { id: 100024, code: '+32', en: 'Belgium', cn: '比利时', ab: 'BE' },
    { id: 100025, code: '+501', en: 'Belize', cn: '伯利兹', ab: 'BZ' },
    { id: 100026, code: '+229', en: 'Benin', cn: '贝宁', ab: 'BJ' },
    { id: 100027, code: '+1441', en: 'Bermuda Is.', cn: '百慕大群岛', ab: 'BM' },
    { id: 100028, code: '+591', en: 'Bolivia', cn: '玻利维亚', ab: 'BO' },
    { id: 100029, code: '+267', en: 'Botswana', cn: '博茨瓦纳', ab: 'BW' },
    { id: 100030, code: '+55', en: 'Brazil', cn: '巴西', ab: 'BR' },
    { id: 100031, code: '+673', en: 'Brunei', cn: '文莱', ab: 'BN' },
    { id: 100032, code: '+359', en: 'Bulgaria', cn: '保加利亚', ab: 'BG' },
    { id: 100033, code: '+226', en: 'Burkina-faso', cn: '布基纳法索', ab: 'BF' },
    { id: 100034, code: '+95', en: 'Burma', cn: '缅甸', ab: 'MM' },
    { id: 100035, code: '+257', en: 'Burundi', cn: '布隆迪', ab: 'BI' },
    { id: 100036, code: '+237', en: 'Cameroon', cn: '喀麦隆', ab: 'CM' },
    { id: 100037, code: '+1', en: 'Canada', cn: '加拿大', ab: 'CA' },
    { id: 100038, code: '+1345', en: 'Cayman Is.', cn: '开曼群岛', ab: '' },
    { id: 100039, code: '+236', en: 'Central African Republic', cn: '中非共和国', ab: 'CF' },
    { id: 100040, code: '+235', en: 'Chad', cn: '乍得', ab: 'TD' },
    { id: 100041, code: '+56', en: 'Chile', cn: '智利', ab: 'CL' },
    { id: 100042, code: '+86', en: 'China', cn: '中国', ab: 'CN' },
    { id: 100043, code: '+57', en: 'Colombia', cn: '哥伦比亚', ab: 'CO' },
    { id: 100044, code: '+242', en: 'Congo', cn: '刚果', ab: 'CG' },
    { id: 100045, code: '+682', en: 'Cook Is.', cn: '库克群岛', ab: 'CK' },
    { id: 100046, code: '+506', en: 'Costa Rica', cn: '哥斯达黎加', ab: 'CR' },
    { id: 100047, code: '+53', en: 'Cuba', cn: '古巴', ab: 'CU' },
    { id: 100048, code: '+357', en: 'Cyprus', cn: '塞浦路斯', ab: 'CY' },
    { id: 100049, code: '+420', en: 'Czech Republic', cn: '捷克', ab: 'CZ' },
    { id: 100050, code: '+45', en: 'Denmark', cn: '丹麦', ab: 'DK' },
    { id: 100051, code: '+253', en: 'Djibouti', cn: '吉布提', ab: 'DJ' },
    { id: 100052, code: '+1890', en: 'Dominica Rep.', cn: '多米尼加共和国', ab: 'DO' },
    { id: 100053, code: '+593', en: 'Ecuador', cn: '厄瓜多尔', ab: 'EC' },
    { id: 100054, code: '+20', en: 'Egypt', cn: '埃及', ab: 'EG' },
    { id: 100055, code: '+503', en: 'EI Salvador', cn: '萨尔瓦多', ab: 'SV' },
    { id: 100056, code: '+372', en: 'Estonia', cn: '爱沙尼亚', ab: 'EE' },
    { id: 100057, code: '+251', en: 'Ethiopia', cn: '埃塞俄比亚', ab: 'ET' },
    { id: 100058, code: '+679', en: 'Fiji', cn: '斐济', ab: 'FJ' },
    { id: 100059, code: '+358', en: 'Finland', cn: '芬兰', ab: 'FI' },
    { id: 100060, code: '+33', en: 'France', cn: '法国', ab: 'FR' },
    { id: 100061, code: '+594', en: 'French Guiana', cn: '法属圭亚那', ab: 'GF' },
    { id: 100062, code: '+241', en: 'Gabon', cn: '加蓬', ab: 'GA' },
    { id: 100063, code: '+220', en: 'Gambia', cn: '冈比亚', ab: 'GM' },
    { id: 100064, code: '+995', en: 'Georgia', cn: '格鲁吉亚', ab: 'GE' },
    { id: 100065, code: '+49', en: 'Germany', cn: '德国', ab: 'DE' },
    { id: 100066, code: '+233', en: 'Ghana', cn: '加纳', ab: 'GH' },
    { id: 100067, code: '+350', en: 'Gibraltar', cn: '直布罗陀', ab: 'GI' },
    { id: 100068, code: '+30', en: 'Greece', cn: '希腊', ab: 'GR' },
    { id: 100069, code: '+1809', en: 'Grenada', cn: '格林纳达', ab: 'GD' },
    { id: 100070, code: '+1671', en: 'Guam', cn: '关岛', ab: 'GU' },
    { id: 100071, code: '+502', en: 'Guatemala', cn: '危地马拉', ab: 'GT' },
    { id: 100072, code: '+224', en: 'Guinea', cn: '几内亚', ab: 'GN' },
    { id: 100073, code: '+592', en: 'Guyana', cn: '圭亚那', ab: 'GY' },
    { id: 100074, code: '+509', en: 'Haiti', cn: '海地', ab: 'HT' },
    { id: 100075, code: '+504', en: 'Honduras', cn: '洪都拉斯', ab: 'HN' },
    { id: 100076, code: '+852', en: 'Hongkong', cn: '香港', ab: 'HK' },
    { id: 100077, code: '+36', en: 'Hungary', cn: '匈牙利', ab: 'HU' },
    { id: 100078, code: '+354', en: 'Iceland', cn: '冰岛', ab: 'IS' },
    { id: 100079, code: '+91', en: 'India', cn: '印度', ab: 'IN' },
    { id: 100080, code: '+62', en: 'Indonesia', cn: '印度尼西亚', ab: 'ID' },
    { id: 100081, code: '+98', en: 'Iran', cn: '伊朗', ab: 'IR' },
    { id: 100082, code: '+964', en: 'Iraq', cn: '伊拉克', ab: 'IQ' },
    { id: 100083, code: '+353', en: 'Ireland', cn: '爱尔兰', ab: 'IE' },
    { id: 100084, code: '+972', en: 'Israel', cn: '以色列', ab: 'IL' },
    { id: 100085, code: '+39', en: 'Italy', cn: '意大利', ab: 'IT' },
    { id: 100086, code: '+225', en: 'Ivory Coast', cn: '科特迪瓦', ab: '' },
    { id: 100087, code: '+1876', en: 'Jamaica', cn: '牙买加', ab: 'JM' },
    { id: 100088, code: '+81', en: 'Japan', cn: '日本', ab: 'JP' },
    { id: 100089, code: '+962', en: 'Jordan', cn: '约旦', ab: 'JO' },
    { id: 100090, code: '+855', en: 'Kampuchea (Cambodia )', cn: '柬埔寨', ab: 'KH' },
    { id: 100091, code: '+327', en: 'Kazakstan', cn: '哈萨克斯坦', ab: 'KZ' },
    { id: 100092, code: '+254', en: 'Kenya', cn: '肯尼亚', ab: 'KE' },
    { id: 100093, code: '+82', en: 'Korea', cn: '韩国', ab: 'KR' },
    { id: 100094, code: '+965', en: 'Kuwait', cn: '科威特', ab: 'KW' },
    { id: 100095, code: '+331', en: 'Kyrgyzstan', cn: '吉尔吉斯坦', ab: 'KG' },
    { id: 100096, code: '+856', en: 'Laos', cn: '老挝', ab: 'LA' },
    { id: 100097, code: '+371', en: 'Latvia', cn: '拉脱维亚', ab: 'LV' },
    { id: 100098, code: '+961', en: 'Lebanon', cn: '黎巴嫩', ab: 'LB' },
    { id: 100099, code: '+266', en: 'Lesotho', cn: '莱索托', ab: 'LS' },
    { id: 100100, code: '+231', en: 'Liberia', cn: '利比里亚', ab: 'LR' },
    { id: 100101, code: '+218', en: 'Libya', cn: '利比亚', ab: 'LY' },
    { id: 100102, code: '+423', en: 'Liechtenstein', cn: '列支敦士登', ab: 'LI' },
    { id: 100103, code: '+370', en: 'Lithuania', cn: '立陶宛', ab: 'LT' },
    { id: 100104, code: '+352', en: 'Luxembourg', cn: '卢森堡', ab: 'LU' },
    { id: 100105, code: '+853', en: 'Macao', cn: '澳门', ab: 'MO' },
    { id: 100106, code: '+261', en: 'Madagascar', cn: '马达加斯加', ab: 'MG' },
    { id: 100107, code: '+265', en: 'Malawi', cn: '马拉维', ab: 'MW' },
    { id: 100108, code: '+60', en: 'Malaysia', cn: '马来西亚', ab: 'MY' },
    { id: 100109, code: '+960', en: 'Maldives', cn: '马尔代夫', ab: 'MV' },
    { id: 100110, code: '+223', en: 'Mali', cn: '马里', ab: 'ML' },
    { id: 100111, code: '+356', en: 'Malta', cn: '马耳他', ab: 'MT' },
    { id: 100112, code: '+1670', en: 'Mariana Is', cn: '马里亚那群岛', ab: '' },
    { id: 100113, code: '+596', en: 'Martinique', cn: '马提尼克', ab: '' },
    { id: 100114, code: '+230', en: 'Mauritius', cn: '毛里求斯', ab: 'MU' },
    { id: 100115, code: '+52', en: 'Mexico', cn: '墨西哥', ab: 'MX' },
    { id: 100116, code: '+373', en: 'Moldova, Republic of', cn: '摩尔多瓦', ab: 'MD' },
    { id: 100117, code: '+377', en: 'Monaco', cn: '摩纳哥', ab: 'MC' },
    { id: 100118, code: '+976', en: 'Mongolia', cn: '蒙古', ab: 'MN' },
    { id: 100119, code: '+1664', en: 'Montserrat Is', cn: '蒙特塞拉特岛', ab: 'MS' },
    { id: 100120, code: '+212', en: 'Morocco', cn: '摩洛哥', ab: 'MA' },
    { id: 100121, code: '+258', en: 'Mozambique', cn: '莫桑比克', ab: 'MZ' },
    { id: 100122, code: '+264', en: 'Namibia', cn: '纳米比亚', ab: 'NA' },
    { id: 100123, code: '+674', en: 'Nauru', cn: '瑙鲁', ab: 'NR' },
    { id: 100124, code: '+977', en: 'Nepal', cn: '尼泊尔', ab: 'NP' },
    { id: 100125, code: '+599', en: 'Netheriands Antilles', cn: '荷属安的列斯', ab: '' },
    { id: 100126, code: '+31', en: 'Netherlands', cn: '荷兰', ab: 'NL' },
    { id: 100127, code: '+64', en: 'New Zealand', cn: '新西兰', ab: 'NZ' },
    { id: 100128, code: '+505', en: 'Nicaragua', cn: '尼加拉瓜', ab: 'NI' },
    { id: 100129, code: '+227', en: 'Niger', cn: '尼日尔', ab: 'NE' },
    { id: 100130, code: '+234', en: 'Nigeria', cn: '尼日利亚', ab: 'NG' },
    { id: 100131, code: '+850', en: 'North Korea', cn: '朝鲜', ab: 'KP' },
    { id: 100132, code: '+47', en: 'Norway', cn: '挪威', ab: 'NO' },
    { id: 100133, code: '+968', en: 'Oman', cn: '阿曼', ab: 'OM' },
    { id: 100134, code: '+92', en: 'Pakistan', cn: '巴基斯坦', ab: 'PK' },
    { id: 100135, code: '+507', en: 'Panama', cn: '巴拿马', ab: 'PA' },
    { id: 100136, code: '+675', en: 'Papua New Cuinea', cn: '巴布亚新几内亚', ab: 'PG' },
    { id: 100137, code: '+595', en: 'Paraguay', cn: '巴拉圭', ab: 'PY' },
    { id: 100138, code: '+51', en: 'Peru', cn: '秘鲁', ab: 'PE' },
    { id: 100139, code: '+63', en: 'Philippines', cn: '菲律宾', ab: 'PH' },
    { id: 100140, code: '+48', en: 'Poland', cn: '波兰', ab: 'PL' },
    { id: 100141, code: '+689', en: 'French Polynesia', cn: '法属玻利尼西亚', ab: 'PF' },
    { id: 100142, code: '+351', en: 'Portugal', cn: '葡萄牙', ab: 'PT' },
    { id: 100143, code: '+1787', en: 'Puerto Rico', cn: '波多黎各', ab: 'PR' },
    { id: 100144, code: '+974', en: 'Qatar', cn: '卡塔尔', ab: 'QA' },
    { id: 100145, code: '+262', en: 'Reunion', cn: '留尼旺', ab: '' },
    { id: 100146, code: '+40', en: 'Romania', cn: '罗马尼亚', ab: 'RO' },
    { id: 100147, code: '+7', en: 'Russia', cn: '俄罗斯', ab: 'RU' },
    { id: 100148, code: '+1758', en: 'Saint Lueia', cn: '圣卢西亚', ab: 'LC' },
    { id: 100149, code: '+1784', en: 'Saint Vincent', cn: '圣文森特岛', ab: 'VC' },
    { id: 100150, code: '+684', en: 'Samoa Eastern', cn: '东萨摩亚(美)', ab: '' },
    { id: 100151, code: '+685', en: 'Samoa Western', cn: '西萨摩亚', ab: '' },
    { id: 100152, code: '+378', en: 'San Marino', cn: '圣马力诺', ab: 'SM' },
    { id: 100153, code: '+239', en: 'Sao Tome and Principe', cn: '圣多美和普林西比', ab: 'ST' },
    { id: 100154, code: '+966', en: 'Saudi Arabia', cn: '沙特阿拉伯', ab: 'SA' },
    { id: 100155, code: '+221', en: 'Senegal', cn: '塞内加尔', ab: 'SN' },
    { id: 100156, code: '+248', en: 'Seychelles', cn: '塞舌尔', ab: 'SC' },
    { id: 100157, code: '+232', en: 'Sierra Leone', cn: '塞拉利昂', ab: 'SL' },
    { id: 100158, code: '+65', en: 'Singapore', cn: '新加坡', ab: 'SG' },
    { id: 100159, code: '+421', en: 'Slovakia', cn: '斯洛伐克', ab: 'SK' },
    { id: 100160, code: '+386', en: 'Slovenia', cn: '斯洛文尼亚', ab: 'SI' },
    { id: 100161, code: '+677', en: 'Solomon Is', cn: '所罗门群岛', ab: 'SB' },
    { id: 100162, code: '+252', en: 'Somali', cn: '索马里', ab: 'SO' },
    { id: 100163, code: '+27', en: 'South Africa', cn: '南非', ab: 'ZA' },
    { id: 100164, code: '+34', en: 'Spain', cn: '西班牙', ab: 'ES' },
    { id: 100165, code: '+94', en: 'Sri Lanka', cn: '斯里兰卡', ab: 'LK' },
    { id: 100166, code: '+1758', en: 'St.Lucia', cn: '圣卢西亚', ab: 'LC' },
    { id: 100167, code: '+1784', en: 'St.Vincent', cn: '圣文森特', ab: 'VC' },
    { id: 100168, code: '+249', en: 'Sudan', cn: '苏丹', ab: 'SD' },
    { id: 100169, code: '+597', en: 'Suriname', cn: '苏里南', ab: 'SR' },
    { id: 100170, code: '+268', en: 'Swaziland', cn: '斯威士兰', ab: 'SZ' },
    { id: 100171, code: '+46', en: 'Sweden', cn: '瑞典', ab: 'SE' },
    { id: 100172, code: '+41', en: 'Switzerland', cn: '瑞士', ab: 'CH' },
    { id: 100173, code: '+963', en: 'Syria', cn: '叙利亚', ab: 'SY' },
    { id: 100174, code: '+886', en: 'Taiwan', cn: '台湾省', ab: 'TW' },
    { id: 100175, code: '+992', en: 'Tajikstan', cn: '塔吉克斯坦', ab: 'TJ' },
    { id: 100176, code: '+255', en: 'Tanzania', cn: '坦桑尼亚', ab: 'TZ' },
    { id: 100177, code: '+66', en: 'Thailand', cn: '泰国', ab: 'TH' },
    { id: 100178, code: '+228', en: 'Togo', cn: '多哥', ab: 'TG' },
    { id: 100179, code: '+676', en: 'Tonga', cn: '汤加', ab: 'TO' },
    { id: 100180, code: '+1809', en: 'Trinidad and Tobago', cn: '特立尼达和多巴哥', ab: 'TT' },
    { id: 100181, code: '+216', en: 'Tunisia', cn: '突尼斯', ab: 'TN' },
    { id: 100182, code: '+90', en: 'Turkey', cn: '土耳其', ab: 'TR' },
    { id: 100183, code: '+993', en: 'Turkmenistan', cn: '土库曼斯坦', ab: 'TM' },
    { id: 100184, code: '+256', en: 'Uganda', cn: '乌干达', ab: 'UG' },
    { id: 100185, code: '+380', en: 'Ukraine', cn: '乌克兰', ab: 'UA' },
    { id: 100186, code: '+971', en: 'United Arab Emirates', cn: '阿拉伯联合酋长国', ab: 'AE' },
    { id: 100187, code: '+44', en: 'United Kiongdom', cn: '英国', ab: 'GB' },
    { id: 100188, code: '+1', en: 'United States of America', cn: '美国', ab: 'US' },
    { id: 100189, code: '+598', en: 'Uruguay', cn: '乌拉圭', ab: 'UY' },
    { id: 100190, code: '+233', en: 'Uzbekistan', cn: '乌兹别克斯坦', ab: 'UZ' },
    { id: 100191, code: '+58', en: 'Venezuela', cn: '委内瑞拉', ab: 'VE' },
    { id: 100192, code: '+84', en: 'Vietnam', cn: '越南', ab: 'VN' },
    { id: 100193, code: '+967', en: 'Yemen', cn: '也门', ab: 'YE' },
    { id: 100194, code: '+381', en: 'Yugoslavia', cn: '南斯拉夫', ab: 'YU' },
    { id: 100195, code: '+263', en: 'Zimbabwe', cn: '津巴布韦', ab: 'ZW' },
    { id: 100196, code: '+243', en: 'Zaire', cn: '扎伊尔', ab: 'ZR' },
    { id: 100197, code: '+260', en: 'Zambia', cn: '赞比亚', ab: 'ZM' },
];

export default areas;
