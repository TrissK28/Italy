// Italy Attractions Data
// Design: Modern Travel Magazine Style
// Data source: Official websites + verified travel resources (2025-2026)

export interface Attraction {
  id: string;
  name: string;
  nameCn: string;
  city: string;
  address: string;
  ticketPrice: string;
  openingHours: string;
  freeDay: string;
  closedDay: string;
  notes: string[];
  bookingRequired: boolean;
  dressCode: boolean;
  tags: string[];
  bookingUrl?: string;
  lat?: number;
  lng?: number;
}

export interface City {
  id: string;
  name: string;
  nameCn: string;
  colorClass: string;
  accentColor: string;
  description: string;
  attractions: Attraction[];
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}

export const cities: City[] = [
  {
    id: "rome",
    name: "Roma",
    nameCn: "罗马",
    colorClass: "city-rome",
    accentColor: "#C4622D",
    description: "永恒之城，古罗马帝国的心脏，拥有世界上最密集的历史遗迹",
    mapCenter: { lat: 41.8967, lng: 12.4822 },
    mapZoom: 14,
    attractions: [
      {
        id: "colosseum",
        name: "Colosseum",
        nameCn: "斗兽场",
        city: "rome",
        address: "Piazza del Colosseo, 1, 00184 Roma",
        ticketPrice: "标准票：€18（含古罗马广场+帕拉蒂尼山）\n全体验票：€24（含地下室+竞技场地板）",
        openingHours: "夏季（3月末—10月末）：8:30—19:15（最晚入场18:15）\n冬季（10月末—2月末）：8:30—16:30（最晚入场15:30）",
        freeDay: "每月第一个周日（仅标准区域）\n4月25日（解放日）\n6月2日（共和国日）\n11月4日（国家统一日）",
        closedDay: "12月25日、1月1日",
        notes: [
          "强烈建议提前在官网预约，旺季门票经常售罄",
          "免费日现场排队时间极长（可达3—4小时），且不开放地下室和竞技场地板",
          "不同票型入口不同，需提前确认所在入口",
          "禁止携带大型行李箱，安检严格",
          "建议早上8:30开门即入场，或下午17:00后入场以避开人流高峰"
        ],
        bookingRequired: true,
        dressCode: false,
        tags: ["需预约", "联票"],
        bookingUrl: "https://ticketing.colosseo.it/en/",
        lat: 41.8902,
        lng: 12.4922
      },
      {
        id: "vatican",
        name: "Vatican Museums & Sistine Chapel",
        nameCn: "梵蒂冈博物馆与西斯廷教堂",
        city: "rome",
        address: "Vatican City",
        ticketPrice: "成人：€20（现场购票）\n成人：€25（官网预约，含快速通道）\n儿童7—18岁：€8（现场）/ €13（预约）\n7岁以下：免费\n欧盟学生：€10（现场）/ €15（预约）",
        openingHours: "周一至周六 8:00—20:00（最晚入场18:00）",
        freeDay: "每月最后一个周日 9:00—14:00（最晚入场12:30）",
        closedDay: "周日（除每月最后一个周日）\n1月1日、1月6日、复活节、复活节次日\n6月29日、8月15日、11月1日\n12月8日、12月25日、12月26日",
        notes: [
          "强烈建议提前在官网预约，避免排队数小时",
          "进入西斯廷教堂须着装得体：禁止短裤、无袖上衣、露肩装",
          "西斯廷教堂内禁止拍照，工作人员会提醒",
          "参观时间建议3—4小时",
          "唯一官方购票网站：tickets.museivaticani.va，谨防第三方高价票"
        ],
        bookingRequired: true,
        dressCode: true,
        tags: ["需预约", "着装要求", "禁止拍照"],
        bookingUrl: "https://tickets.museivaticani.va",
        lat: 41.9065,
        lng: 12.4536
      },
      {
        id: "pantheon",
        name: "Pantheon",
        nameCn: "万神殿",
        city: "rome",
        address: "Piazza della Rotonda, 00186 Roma",
        ticketPrice: "基础票：€5（成人）\n含语音导览：€15 / 17岁以下€10\n含导游讲解：€25.5 / 17岁以下€15.5",
        openingHours: "周一至周六 9:00—19:00\n周日 9:00—18:00\n节假日 9:00—13:00",
        freeDay: "无常规免费日（2023年起开始收费）",
        closedDay: "1月1日、12月25日；部分宗教节假日",
        notes: [
          "2023年起正式收费，需提前预约",
          "进入须着装得体，禁止穿着暴露",
          "内部禁止大声喧哗，保持安静",
          "建议避开中午时段（11:00—14:00），人流量最大",
          "穹顶中央圆孔（直径9米）是唯一采光来源，雨天可见雨水落入"
        ],
        bookingRequired: true,
        dressCode: true,
        tags: ["需预约", "着装要求"],
        bookingUrl: "https://www.museiitaliani.it/",
        lat: 41.8986,
        lng: 12.4769
      },
      {
        id: "roman-forum",
        name: "Roman Forum & Palatine Hill",
        nameCn: "古罗马广场与帕拉蒂尼山",
        city: "rome",
        address: "Via della Salara Vecchia, 5/6, 00186 Roma",
        ticketPrice: "联票€18（与斗兽场共用，无单独票）",
        openingHours: "与斗兽场相同（9:00开始）",
        freeDay: "与斗兽场相同（每月第一个周日等）",
        closedDay: "12月25日、1月1日",
        notes: [
          "购买斗兽场门票即可进入，同一张票，无需额外购买",
          "地面不平，建议穿舒适的运动鞋，避免高跟鞋",
          "夏季烈日暴晒，建议带水和防晒霜",
          "帕拉蒂尼山可俯瞰整个古罗马广场全景"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["联票"],
        bookingUrl: "https://ticketing.colosseo.it/en/",
        lat: 41.8925,
        lng: 12.4853
      },
      {
        id: "castel-sant-angelo",
        name: "Castel Sant'Angelo",
        nameCn: "圣天使堡",
        city: "rome",
        address: "Lungotevere Castello, 50, 00193 Roma",
        ticketPrice: "成人：€13\n欧盟18—25岁：€2\n18岁以下：免费（需出示证件）",
        openingHours: "周二至周日 9:00—19:30",
        freeDay: "每月第一个周日",
        closedDay: "每周一；1月1日、12月25日",
        notes: [
          "建议提前网上预约，节省排队时间",
          "顶层露台可俯瞰罗马全景，是拍照绝佳地点",
          "内部有多层展览，参观时间约1.5—2小时",
          "与梵蒂冈博物馆步行约10分钟，可安排同日参观"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约"],
        bookingUrl: "https://www.coopculture.it/en/tickets/",
        lat: 41.9031,
        lng: 12.4663
      },
      {
        id: "trevi-fountain",
        name: "Trevi Fountain",
        nameCn: "特雷维喷泉",
        city: "rome",
        address: "Piazza di Trevi, 00187 Roma",
        ticketPrice: "免费\n旺季围栏近景区：€2",
        openingHours: "全天开放（24小时）",
        freeDay: "全年免费",
        closedDay: "无",
        notes: [
          "旺季（夏季）人流极大，建议清晨6:00—8:00或深夜前往",
          "禁止坐在喷泉边缘，违者罚款高达€500",
          "投币许愿时需背对喷泉，用右手从左肩投出",
          "附近扒手较多，注意保管财物",
          "喷泉每天凌晨清洁，期间无水"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["免费"],
        lat: 41.9009,
        lng: 12.4833
      },
      {
        id: "spanish-steps",
        name: "Spanish Steps",
        nameCn: "西班牙台阶",
        city: "rome",
        address: "Piazza di Spagna, 00187 Roma",
        ticketPrice: "免费",
        openingHours: "全天开放",
        freeDay: "全年免费",
        closedDay: "无",
        notes: [
          "禁止在台阶上进食，违者罚款高达€400",
          "旺季人流量极大，建议清晨前往",
          "台阶顶部有特立尼塔教堂，可免费参观",
          "台阶下方的破船喷泉（Fontana della Barcaccia）是贝尼尼父子作品"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["免费"],
        lat: 41.9058,
        lng: 12.4843
      },
      {
        id: "borghese-gallery",
        name: "Galleria Borghese",
        nameCn: "博尔盖塞美术馆",
        city: "rome",
        address: "Piazzale Scipione Borghese, 5, 00197 Roma",
        ticketPrice: "成人：€18（含€2强制预约费）\n欧盟18—25岁：€4（含预约费）\n18岁以下：免费（仍需预约）",
        openingHours: "周二至周日 9:00—19:00（最晚入场17:00）\n参观时段（每场2小时，限360人）：\n09:00—11:00 / 11:00—13:00 / 13:00—15:00 / 15:00—17:00 / 17:00—19:00",
        freeDay: "每月第一个周日（仍需提前预约，名额极少）",
        closedDay: "每周一、12月25日、1月1日",
        notes: [
          "旺季建议提前1—2个月预约",
          "每场参观严格限时2小时，到时须离场",
          "每场最多360人，名额极为紧张，官网票通常提前数周售罄",
          "所有门票须额外支付€2强制预约费，包括免费票",
          "禁止携带大型背包入内，需寄存于免费衣帽间",
          "禁止拍摄闪光灯，部分区域禁止拍照",
          "馆内收藏贝尼尼雕塑、卡拉瓦乔画作及拉斐尔作品，建议提前了解重点藏品",
          "距西班牙台阶步行约20分钟，距人民广场步行约15分钟"
        ],
        bookingRequired: true,
        dressCode: false,
        tags: ["需预约", "限时参观"],
        bookingUrl: "https://borghese.gallery/tickets/",
        lat: 41.9143,
        lng: 12.4922
      },
    ],
  },
  {
    id: "florence",
    name: "Firenze",
    nameCn: "佛罗伦萨",
    colorClass: "city-florence",
    accentColor: "#8B6914",
    description: "文艺复兴的摇篮，托斯卡纳大区首府，艺术与建筑的圣地",
    mapCenter: { lat: 43.7696, lng: 11.2558 },
    mapZoom: 15,
    attractions: [
      {
        id: "uffizi",
        name: "Uffizi Gallery",
        nameCn: "乌菲兹美术馆",
        city: "florence",
        address: "Piazzale degli Uffizi, 6, 50122 Firenze",
        ticketPrice: "现场购票：€25\n提前预约：€29（含€4预约费）\n16:00后入场：€16\n18岁以下：免费\n欧盟18—25岁：€2",
        openingHours: "周二至周日 8:15—18:30\n周二延长至21:30（特别夜场）\n周一闭馆",
        freeDay: "每月第一个周日\n4月25日（解放日）\n6月2日（共和国日）\n11月4日（国家统一日）",
        closedDay: "每周一；1月1日、5月1日、12月25日",
        notes: [
          "强烈建议提前预约，旺季极难买到当日票",
          "馆内禁止使用闪光灯拍照",
          "参观时间建议2—3小时",
          "周二延长开放时间（至21:30）是避开人群的好选择",
          "波提切利《春》和《维纳斯的诞生》是镇馆之宝，位于第10—14展厅"
        ],
        bookingRequired: true,
        dressCode: false,
        tags: ["需预约", "禁止闪光灯"],
        bookingUrl: "https://www.uffizi.it/en/pages/tickets-fares",
        lat: 43.7678,
        lng: 11.2553
      },
      {
        id: "duomo-florence",
        name: "Santa Maria del Fiore (Duomo Complex)",
        nameCn: "佛罗伦萨大教堂建筑群",
        city: "florence",
        address: "Piazza del Duomo, 50122 Firenze",
        ticketPrice: "大教堂：免费（现场排队即可）\n布鲁内莱斯基通票（穹顶+博物馆+洗礼堂+圣雷帕拉塔）：€30（成人）/ €12（7—14岁）\n乔托通票（钟楼+博物馆+洗礼堂+圣雷帕拉塔）：€20（成人）/ €7（7—14岁）\n基贝尔蒂通票（博物馆+洗礼堂+圣雷帕拉塔）：€15（成人）/ €5（7—14岁）\n穹顶导游讲解：€45（成人）/ €30（7—14岁）",
        openingHours: "大教堂：周一至周六 10:15—15:45\n穹顶：周一至周五 8:15—18:45；周六 8:15—16:30；周日 12:45—16:30\n洗礼堂：8:30—19:30\n钟楼：8:15—18:45\n博物馆：8:30—19:00",
        freeDay: "大教堂全年免费；其他区域每月第一个周日",
        closedDay: "各区域不同，1月1日、复活节、12月25日全部关闭",
        notes: [
          "穹顶须提前预约，强烈建议至少提前1周",
          "穹顶攀爬需爬463级台阶，且台阶倾斜，不适合恐高者",
          "进入大教堂须着装得体（遮肩遮膝）",
          "穹顶和钟楼不适合携带大型背包",
          "大教堂内部壁画《末日审判》由瓦萨里绘制，穹顶内壁可近距离欣赏"
        ],
        bookingRequired: true,
        dressCode: true,
        tags: ["需预约", "着装要求", "部分免费"],
        bookingUrl: "https://tickets.duomo.firenze.it/en/",
        lat: 43.7731,
        lng: 11.2560
      },
      {
        id: "accademia-florence",
        name: "Galleria dell'Accademia",
        nameCn: "学院美术馆",
        city: "florence",
        address: "Via Ricasoli, 58/60, 50129 Firenze",
        ticketPrice: "成人：€20（含€4预约费）\n欧盟18—25岁：€2（+€4预约费）\n18岁以下：免费",
        openingHours: "周二至周日 8:15—18:50（最晚入场18:20）\n周一闭馆",
        freeDay: "每月第一个周日\n4月25日；6月2日；11月4日",
        closedDay: "每周一；1月1日、5月1日、12月25日",
        notes: [
          "米开朗基罗《大卫》雕像所在地，必须提前预约",
          "禁止使用闪光灯",
          "参观时间约1—1.5小时",
          "《大卫》原作高5.17米，位于专门设计的圆形大厅中央"
        ],
        bookingRequired: true,
        dressCode: false,
        tags: ["需预约", "禁止闪光灯"],
        bookingUrl: "https://www.b-ticket.com/b-ticket/firenzemusei/",
        lat: 43.7767,
        lng: 11.2586
      },
      {
        id: "palazzo-vecchio",
        name: "Palazzo Vecchio",
        nameCn: "旧宫",
        city: "florence",
        address: "Piazza della Signoria, 50122 Firenze",
        ticketPrice: "成人（25岁以上）：€18.5\n青年（18—25岁）：€16\n18岁以下：免费",
        openingHours: "周一至周三、周六 9:00—23:00\n周四、周五 9:00—14:00",
        freeDay: "每月第一个周日",
        closedDay: "不定期，建议查官网",
        notes: [
          "可登上钟楼俯瞰佛罗伦萨全景",
          "内有[五百人大厅]，瓦萨里壁画极为壮观",
          "广场上的大卫雕像为复制品，原作在学院美术馆"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约"],
        bookingUrl: "https://ticketsmuseums.comune.fi.it/1_museo-di-palazzo-vecchio/",
        lat: 43.7697,
        lng: 11.2558
      },
      {
        id: "ponte-vecchio",
        name: "Ponte Vecchio",
        nameCn: "老桥",
        city: "florence",
        address: "Ponte Vecchio, 50125 Firenze",
        ticketPrice: "免费",
        openingHours: "全天开放",
        freeDay: "全年免费",
        closedDay: "无",
        notes: [
          "桥上全是珠宝金店，价格较高",
          "旺季人流极大，建议清晨或傍晚前往",
          "从桥上可欣赏阿尔诺河美景",
          "二战期间是佛罗伦萨唯一未被炸毁的桥梁"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["免费"],
        lat: 43.7681,
        lng: 11.2531
      },
    ],
  },
  {
    id: "venice",
    name: "Venezia",
    nameCn: "威尼斯",
    colorClass: "city-venice",
    accentColor: "#1B4B8A",
    description: "建在水上的奇迹之城，118座岛屿、400余座桥梁构成的独特世界",
    mapCenter: { lat: 45.4371, lng: 12.3326 },
    mapZoom: 15,
    attractions: [
      {
        id: "st-marks",
        name: "Piazza San Marco & Basilica di San Marco",
        nameCn: "圣马可广场与圣马可大教堂",
        city: "venice",
        address: "P.za San Marco, 30100 Venezia",
        ticketPrice: "广场：免费\n大教堂：€3（6岁以下免费）\n黄金祭坛：€5\n马匹博物馆：€7\n钟楼：€10（6岁以下免费）",
        openingHours: "大教堂：9:30—17:15（周日下午开放）\n钟楼：9:30—21:15（夏季）/ 9:30—17:45（冬季）",
        freeDay: "广场全年免费；大教堂本身免费，各区域单独收费",
        closedDay: "部分宗教节日",
        notes: [
          "进入大教堂须着装得体（遮肩遮膝），可在入口借用披肩",
          "禁止携带大型背包进入大教堂",
          "大教堂内部分区域禁止拍照",
          "钟楼可俯瞰威尼斯全景，建议提前预约",
          "广场在涨潮时可能被海水淹没（Acqua Alta），建议查看潮汐预报"
        ],
        bookingRequired: false,
        dressCode: true,
        tags: ["着装要求", "部分免费"],
        bookingUrl: "https://www.basilicasanmarco.it/en/",
        lat: 45.4345,
        lng: 12.3390
      },
      {
        id: "doges-palace",
        name: "Doge's Palace (Palazzo Ducale)",
        nameCn: "总督宫",
        city: "venice",
        address: "P.za San Marco, 1, 30124 Venezia",
        ticketPrice: "成人：€30（含科雷尔博物馆）\n学生/老人/6—14岁：€15\n6岁以下：免费",
        openingHours: "9:00—18:00（夏季延长至19:00）",
        freeDay: "每月第一个周日",
        closedDay: "1月1日、12月25日",
        notes: [
          "建议提前在MUVE官网购票，旺季排队时间长",
          "包含叹息桥参观（从内部走过）",
          "参观时间约2—3小时",
          "内有大量精美壁画和金色天花板，丁托列托的《天堂》是世界最大油画之一"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约", "联票"],
        bookingUrl: "https://muve.vivaticket.it/en/event/musei-p-san-marco-ducale/155153",
        lat: 45.4337,
        lng: 12.3401
      },
      {
        id: "rialto-bridge",
        name: "Rialto Bridge",
        nameCn: "里亚托桥",
        city: "venice",
        address: "Sestiere San Polo, 30125 Venezia",
        ticketPrice: "免费",
        openingHours: "全天开放",
        freeDay: "全年免费",
        closedDay: "无",
        notes: [
          "威尼斯最古老的桥梁，横跨大运河",
          "桥上和周边有大量商店和餐厅",
          "旺季人流极大，建议清晨前往拍照",
          "从桥上可欣赏大运河两岸风景"
        ],        bookingRequired: false,
        dressCode: false,
        tags: ["免费"],
        lat: 45.4408,
        lng: 12.3359
      },
      {
        id: "guggenheim-venice",
        name: "Peggy Guggenheim Collection",
        nameCn: "佩吉·古根海姆美术馆",
        city: "venice",
        address: "Dorsoduro, 701-704, 30123 Venezia",
        ticketPrice: "成人：€16\n65岁以上：€14\n26岁以下学生：€9\n10岁以下：免费",
        openingHours: "周三至周一 10:00—18:00",
        freeDay: "每月第一个周日",
        closedDay: "每周二；1月1日、12月25日",
        notes: [
          "现代艺术爱好者必去，收藏毕加索、达利、波洛克等大师作品",
          "花园雕塑区域非常美丽，可欣赏大运河",
          "参观时间约1.5—2小时",
          "周二闭馆，注意安排行程"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约"],        bookingUrl: "https://www.guggenheim-venice.it/en/visit/tickets/",
        lat: 45.4311,
        lng: 12.3319
      },
    ],
  },
  {
    id: "milan",
    name: "Milano",
    nameCn: "米兰",
    colorClass: "city-milan",
    accentColor: "#3A3A4A",
    description: "意大利时尚与金融之都，哥特式建筑与现代设计的完美融合",
    mapCenter: { lat: 45.4654, lng: 9.1866 },
    mapZoom: 14,
    attractions: [
      {
        id: "duomo-milan",
        name: "Duomo di Milano",
        nameCn: "米兰大教堂",
        city: "milan",
        address: "P.za del Duomo, 20122 Milano",
        ticketPrice: "大教堂：€7.5（现场支付宝活动价）\n屋顶（电梯）：€17\n屋顶（楼梯）：€13\n快速通道屋顶：€25",
        openingHours: "大教堂：9:00—19:00\n屋顶：9:00—19:00",
        freeDay: "每月第一个周日",
        closedDay: "部分宗教节日",
        notes: [
          "进入大教堂须着装得体（遮肩遮膝）",
          "屋顶可近距离欣赏哥特式尖塔，天气好时可看到阿尔卑斯山",
          "建议提前网上购票，避免排队",
          "大教堂内有世界最大的彩色玻璃窗之一"
        ],
        bookingRequired: false,
        dressCode: true,
        tags: ["推荐预约", "着装要求"],
        bookingUrl: "https://www.duomomilano.it/en/visit/",
        lat: 45.4641,
        lng: 9.1919
      },
      {
        id: "last-supper",
        name: "The Last Supper (Cenacolo Vinciano)",
        nameCn: "最后的晚餐",
        city: "milan",
        address: "Piazza Santa Maria delle Grazie, 2, 20123 Milano",
        ticketPrice: "成人：€15（+€2预约费）\n18岁以下：€2",
        openingHours: "周二至周日 8:15—19:15（最晚入场18:45）",
        freeDay: "每月第一个周日（需提前预约，仍需支付预约费）",
        closedDay: "每周一；1月1日、5月1日、12月25日",
        notes: [
          "必须提前预约，通常需要提前2—3个月，旺季极难买到",
          "每次参观限15分钟，严格控制人数（每批约30人）",
          "参观时需保持安静，禁止使用闪光灯",
          "建议通过官方网站 vivaticket.com 购票",
          "达·芬奇原作绘于修道院食堂墙壁，非画布作品，极为珍贵"
        ],
        bookingRequired: true,
        dressCode: false,
        tags: ["强制预约", "限时参观"],
        bookingUrl: "https://www.vivaticket.com/it/biglietto/cenacolo-vinciano/2085",
        lat: 45.4659,
        lng: 9.1705
      },
      {
        id: "sforza-castle",
        name: "Castello Sforzesco",
        nameCn: "斯福尔扎城堡",
        city: "milan",
        address: "Piazza Castello, 20121 Milano",
        ticketPrice: "庭院：免费\n博物馆：€5（成人）\n18岁以下/65岁以上：免费",
        openingHours: "庭院：7:00—19:30\n博物馆：周二至周日 10:00—17:30",
        freeDay: "每月第一个周日（博物馆免费）\n每天下午4:30—5:30（博物馆免费）",
        closedDay: "每周一（博物馆）；1月1日、12月25日",
        notes: [
          "城堡内有多个博物馆，包括米开朗基罗最后一件雕塑《龙达尼尼的圣殇》",
          "庭院免费开放，可自由参观",
          "后面的森皮奥内公园也值得一游",
          "每天下午4:30后博物馆免费，是省钱好时机"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["部分免费"],
        bookingUrl: "https://www.vivaticket.com/it/venue/museo-castello-sforzesco/514293061",
        lat: 45.4706,
        lng: 9.1796
      },
      {
        id: "brera-gallery",
        name: "Pinacoteca di Brera",
        nameCn: "布雷拉美术馆",
        city: "milan",
        address: "Via Brera, 28, 20121 Milano",
        ticketPrice: "成人：€15\n18岁以下：免费\n家庭票：€10/人（最多2大+5儿）\n语音导览：€5",
        openingHours: "周二至周日 8:30—18:00",
        freeDay: "每月第一个周日\n每月第三个周三（18岁以上）",
        closedDay: "每周一；1月1日、5月1日、12月25日",
        notes: [
          "意大利最重要的艺术画廊之一，拉斐尔、卡拉瓦乔等大师作品",
          "参观时间约1.5—2小时",
          "附近的布雷拉区是米兰最美的街区之一，有众多画廊和餐厅"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约"],
        bookingUrl: "https://www.brerabooking.org/",
        lat: 45.4721,
        lng: 9.1878
      },
    ],
  },
  {
    id: "naples",
    name: "Napoli & dintorni",
    nameCn: "那不勒斯及周边",
    colorClass: "city-naples",
    accentColor: "#C45A1A",
    description: "意大利南部最大城市，披萨发源地，维苏威火山脚下的历史宝库",
    mapCenter: { lat: 40.8358, lng: 14.2488 },
    mapZoom: 12,
    attractions: [
      {
        id: "pompeii",
        name: "Pompeii Archaeological Park",
        nameCn: "庞贝古城",
        city: "naples",
        address: "Via Villa dei Misteri, 2, 80045 Pompei",
        ticketPrice: "基础票：€20（成人）\n庞贝+票（含郊区别墅）：€25\n欧盟18—25岁：€2\n18岁以下：免费\n年票：€45（成人）",
        openingHours: "4月初—10月末：9:00—19:00（最晚入场17:30）\n11月初—3月末：9:00—17:00（最晚入场15:30）",
        freeDay: "每月第一个周日",
        closedDay: "每周一、12月25日、1月1日",
        notes: [
          "旺季限额20,000人，旺季建议提前购票",
          "场地面积大（约66公顷），建议穿舒适的鞋子，带足水",
          "夏季烈日暴晒，建议带遮阳帽和防晒霜",
          "从那不勒斯乘坐环维苏威火山铁路（Circumvesuviana）约35分钟可达",
          "建议租用语音导览或请导游，否则很多遗迹难以理解"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约"],
        bookingUrl: "https://pompeiisites.org/en/visiting-info/timetables-and-tickets/",
        lat: 40.7503,
        lng: 14.4875
      },
      {
        id: "naples-museum",
        name: "National Archaeological Museum of Naples",
        nameCn: "那不勒斯国家考古博物馆",
        city: "naples",
        address: "Piazza Museo Nazionale, 19, 80135 Napoli",
        ticketPrice: "成人：€15\n欧盟18—25岁：€2\n18岁以下：免费",
        openingHours: "周三至周一 9:00—19:30",
        freeDay: "每月第一个周日",
        closedDay: "每周二；1月1日、12月25日",
        notes: [
          "收藏大量庞贝出土文物，与庞贝古城参观相辅相成",
          "参观时间约2—3小时",
          "馆内有'秘密展厅'（古罗马情色艺术），需单独申请参观",
          "周二闭馆，注意安排行程"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["推荐预约"],        bookingUrl: "https://mann-napoli.it/en/visit-us/",
        lat: 40.8536,
        lng: 14.2507
      },
    ],
  },
  {
    id: "pisa",
    name: "Pisa",
    nameCn: "比萨",
    colorClass: "city-pisa",
    accentColor: "#2A6B4A",
    description: "以斜塔闻名于世的托斯卡纳古城，奇迹广场是世界最美建筑群之一",
    mapCenter: { lat: 43.7228, lng: 10.3966 },
    mapZoom: 15,
    attractions: [
      {
        id: "leaning-tower",
        name: "Piazza dei Miracoli (Leaning Tower of Pisa)",
        nameCn: "比萨斜塔建筑群（奇迹广场）",
        city: "pisa",
        address: "Piazza del Duomo, 56126 Pisa",
        ticketPrice: "斜塔：€18（8岁以下禁入）\n大教堂：€3（持其他票免费）\n洗礼堂/圣墓园/博物馆：各€7\n联票（斜塔+2景点）：€27\n联票（斜塔+全部）：€35",
        openingHours: "斜塔：9:00—20:00（夏季）/ 9:00—18:00（冬季）\n大教堂：10:00—19:00（夏季）/ 10:00—17:00（冬季）",
        freeDay: "大教堂持其他票免费；每月第一个周日（部分景点）",
        closedDay: "1月1日、12月25日",
        notes: [
          "斜塔攀爬须提前预约，每次限30人，每次约35分钟",
          "8岁以下儿童禁止攀登斜塔",
          "斜塔攀爬有294级台阶，且台阶倾斜，需注意安全",
          "建议购买联票更划算",
          "广场草坪上禁止踩踏，违者罚款"
        ],
        bookingRequired: true,
        dressCode: false,
        tags: ["需预约", "联票"],        bookingUrl: "https://www.opapisa.it/en/tickets/",
        lat: 43.7230,
        lng: 10.3966
      },
    ],
  },
  {
    id: "cinque-terre",
    name: "Cinque Terre",
    nameCn: "五渔村",
    colorClass: "city-cinque",
    accentColor: "#1A6B8A",
    description: "利古里亚海岸五个彩色渔村，悬崖峭壁上的世界遗产，徒步爱好者的天堂",
    mapCenter: { lat: 44.1461, lng: 9.6439 },
    mapZoom: 13,
    attractions: [
      {
        id: "cinque-terre-park",
        name: "Cinque Terre National Park",
        nameCn: "五渔村国家公园",
        city: "cinque-terre",
        address: "La Spezia省，利古里亚大区",
        ticketPrice: "五渔村卡（火车+步道）：\n旺季1日€18.70 / 2日€29.00\n淡季1日€14.80 / 2日€26.50\n儿童4—11岁：1日€11.00\n仅步道通行：€7.50",
        openingHours: "全年开放（部分步道季节性关闭）",
        freeDay: "无",
        closedDay: "无（步道可能因天气或维修关闭）",
        notes: [
          "旺季（6—8月）游客极多，建议淡季（4—5月、9—10月）前往",
          "步道难度各异，需穿专业徒步鞋，不建议穿凉鞋",
          "部分步道（如2号步道Via dell'Amore）需额外预约",
          "五个村庄分别为：蒙泰罗索（Monterosso）、韦尔纳扎（Vernazza）、科尔尼利亚（Corniglia）、马纳罗拉（Manarola）、里奥马焦雷（Riomaggiore）",
          "火车是村庄间最便捷的交通方式，购买火车卡最划算"
        ],
        bookingRequired: false,
        dressCode: false,
        tags: ["通票"],        bookingUrl: "https://www.cinqueterre.eu.com/en/cinque-terre-card",
        lat: 44.1461,
        lng: 9.6439
      },
    ]
  }
];

export const globalNotes = {
  freeMuseumSunday: {
    title: "意大利'博物馆周日（Domenica al Museo）",
    content: "每月第一个周日，意大利文化部主办的国家博物馆、美术馆、考古遗址免费开放。适用景点包括斗兽场、古罗马广场、万神殿（部分）、圣天使堡、乌菲兹美术馆、学院美术馆、庞贝古城等。注意：免费日人流极大，部分景点仍需提前预约（可能收取预约费）。"
  },
  holidays: [
    { date: "1月1日", name: "元旦" },
    { date: "1月6日", name: "主显节" },
    { date: "复活节（浮动）", name: "复活节" },
    { date: "复活节次日（浮动）", name: "复活节次日" },
    { date: "4月25日", name: "解放日" },
    { date: "5月1日", name: "劳动节" },
    { date: "6月2日", name: "共和国日" },
    { date: "8月15日", name: "圣母升天节" },
    { date: "11月1日", name: "万圣节" },
    { date: "12月8日", name: "圣母无染原罪节" },
    { date: "12月25日", name: "圣诞节" },
    { date: "12月26日", name: "圣斯蒂芬节" }
  ],
  dressCode: "进入所有教堂（包括圣彼得大教堂、圣马可大教堂、佛罗伦萨大教堂等）须遮肩遮膝。可在入口处借用或购买披肩/围巾。违规者将被拒绝入内。",
  bookingTips: [
    { attraction: "梵蒂冈博物馆", tip: "提前1-2月预约" },
    { attraction: "最后的晚餐（米兰）", tip: "提前2—3个月预约" },
    { attraction: "乌菲兹美术馆", tip: "提前1—2月预约" },
    { attraction: "斗兽场", tip: "提前1月预约" },
    { attraction: "佛罗伦萨大教堂穹顶", tip: "提前1—2月预约" },
    { attraction: "比萨斜塔", tip: "提前1—2天预约" },
    { attraction: "学院美术馆（佛罗伦萨）", tip: "提前3—5天预约" }
  ]
};
