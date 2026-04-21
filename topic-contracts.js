/*
 * ═══════════════════════════════════════════════════════════
 *  TOEIC 600 — I. Corporate Development → Contracts
 * ═══════════════════════════════════════════════════════════
 *
 *  FILE NÀY CHỨA DỮ LIỆU 12 TỪ VỰNG CỦA TOPIC "CONTRACTS"
 *
 *  Cách hoạt động:
 *  - File này đăng ký mảng words vào registry toàn cục
 *    window.__TOEIC_DATA__["contracts"]
 *  - File khung (toeic-app.jsx) sẽ tự động đọc từ registry này
 *
 *  Cách thêm topic mới:
 *  1. Copy file này, đổi tên thành topic-[id].js
 *  2. Đổi key "contracts" thành id của sub-topic (vd: "marketing")
 *  3. Thay nội dung mảng words bên dưới
 *  4. Đảm bảo file được load trước file app chính
 *
 *  Cấu trúc mỗi từ:
 *  {
 *    id: number,              // Số thứ tự 1-12
 *    word: string,            // Từ tiếng Anh
 *    pos: string,             // Loại từ: noun / verb / adj / adv / phrasal verb
 *    ipa_uk: string,          // Phiên âm UK
 *    ipa_us: string,          // Phiên âm US
 *    vi: string,              // Nghĩa tiếng Việt (ngắn gọn)
 *    example: string,         // Câu ví dụ tiếng Anh (ngữ cảnh TOEIC)
 *    exampleVi: string,       // Dịch câu ví dụ sang tiếng Việt
 *    collocations: string[],  // 3 cụm từ thường đi kèm (EN: VI)
 *    synonyms: string[],      // 2-3 từ đồng nghĩa (EN: VI)
 *    distractors: string[],   // 3 đáp án nhiễu cho quiz (tiếng Việt)
 *                             // ⚠️ KHÔNG được trùng với vi của từ khác trong bộ 12
 *  }
 * ═══════════════════════════════════════════════════════════
 */

if (!window.__TOEIC_DATA__) window.__TOEIC_DATA__ = {};

window.__TOEIC_DATA__["contracts"] = [
  {
    id: 1,
    word: "abide by",
    pos: "verb",
    ipa_uk: "/əˈbaɪd baɪ/",
    ipa_us: "/əˈbaɪd baɪ/",
    vi: "tuân thủ, tôn trọng",
    example: "All employees are expected to abide by the safety regulations outlined in their contracts.",
    exampleVi: "Tất cả nhân viên được kỳ vọng tuân thủ các quy định an toàn được nêu trong hợp đồng.",
    collocations: [
      "abide by the rules: tuân thủ quy tắc",
      "abide by the law: tuân thủ pháp luật",
      "abide by a decision: tôn trọng quyết định"
    ],
    synonyms: [
      "comply with: tuân theo",
      "follow: làm theo",
      "observe: chấp hành"
    ],
    distractors: ["phản đối", "trì hoãn", "đề xuất"]
  },
  {
    id: 2,
    word: "agreement",
    pos: "noun",
    ipa_uk: "/əˈɡriːmənt/",
    ipa_us: "/əˈɡriːmənt/",
    vi: "thỏa thuận, hợp đồng",
    example: "The rental agreement must be signed by both the tenant and the landlord before moving in.",
    exampleVi: "Thỏa thuận thuê nhà phải được ký bởi cả người thuê và chủ nhà trước khi dọn vào.",
    collocations: [
      "reach an agreement: đạt thỏa thuận",
      "sign an agreement: ký thỏa thuận",
      "verbal agreement: thỏa thuận miệng"
    ],
    synonyms: [
      "contract: hợp đồng",
      "deal: giao dịch",
      "arrangement: sự sắp xếp"
    ],
    distractors: ["tranh chấp", "khoản vay", "biên bản"]
  },
  {
    id: 3,
    word: "assurance",
    pos: "noun",
    ipa_uk: "/əˈʃʊərəns/",
    ipa_us: "/əˈʃʊrəns/",
    vi: "sự đảm bảo, sự cam đoan",
    example: "The manager gave us assurance that the project would be delivered on schedule.",
    exampleVi: "Người quản lý đưa ra sự đảm bảo rằng dự án sẽ được bàn giao đúng tiến độ.",
    collocations: [
      "give assurance: đưa ra đảm bảo",
      "quality assurance: đảm bảo chất lượng",
      "seek assurance: tìm kiếm sự đảm bảo"
    ],
    synonyms: [
      "guarantee: sự bảo đảm",
      "promise: lời hứa",
      "pledge: cam kết"
    ],
    distractors: ["nghi ngờ", "rủi ro", "khiếu nại"]
  },
  {
    id: 4,
    word: "cancel",
    pos: "verb",
    ipa_uk: "/ˈkænsl/",
    ipa_us: "/ˈkænsl/",
    vi: "hủy bỏ",
    example: "Due to the supplier's repeated delays, the purchasing department decided to cancel the order.",
    exampleVi: "Do nhà cung cấp liên tục trì hoãn, phòng mua hàng đã quyết định hủy đơn hàng.",
    collocations: [
      "cancel a contract: hủy hợp đồng",
      "cancel an order: hủy đơn hàng",
      "cancel a meeting: hủy cuộc họp"
    ],
    synonyms: [
      "terminate: chấm dứt",
      "annul: bãi bỏ",
      "call off: hủy bỏ"
    ],
    distractors: ["phê duyệt", "gia hạn", "xác nhận"]
  },
  {
    id: 5,
    word: "determine",
    pos: "verb",
    ipa_uk: "/dɪˈtɜːmɪn/",
    ipa_us: "/dɪˈtɜːrmɪn/",
    vi: "xác định, quyết định",
    example: "A team of auditors was brought in to determine the cause of the accounting discrepancy.",
    exampleVi: "Một nhóm kiểm toán viên được mời đến để xác định nguyên nhân sai lệch kế toán.",
    collocations: [
      "determine the cause: xác định nguyên nhân",
      "determine the outcome: quyết định kết quả",
      "determine eligibility: xác định điều kiện đủ"
    ],
    synonyms: [
      "decide: quyết định",
      "figure out: tìm ra",
      "ascertain: xác minh"
    ],
    distractors: ["phỏng đoán", "trì hoãn", "phân phối"]
  },
  {
    id: 6,
    word: "engage",
    pos: "verb",
    ipa_uk: "/ɪnˈɡeɪdʒ/",
    ipa_us: "/ɪnˈɡeɪdʒ/",
    vi: "tham gia; thuê, mời",
    example: "The firm engaged an outside consultant to review the terms of the merger.",
    exampleVi: "Công ty đã thuê một chuyên gia tư vấn bên ngoài để xem xét các điều khoản sáp nhập.",
    collocations: [
      "engage a consultant: thuê tư vấn",
      "engage in negotiations: tham gia đàm phán",
      "engage employees: thu hút nhân viên"
    ],
    synonyms: [
      "hire: thuê",
      "involve: lôi kéo",
      "participate: tham gia"
    ],
    distractors: ["sa thải", "từ chối", "nghỉ hưu"]
  },
  {
    id: 7,
    word: "establish",
    pos: "verb",
    ipa_uk: "/ɪˈstæblɪʃ/",
    ipa_us: "/ɪˈstæblɪʃ/",
    vi: "thiết lập, thành lập",
    example: "It took over a year to establish the guidelines for the new international trade agreement.",
    exampleVi: "Phải mất hơn một năm để thiết lập các hướng dẫn cho thỏa thuận thương mại quốc tế mới.",
    collocations: [
      "establish a company: thành lập công ty",
      "establish guidelines: thiết lập hướng dẫn",
      "establish a relationship: thiết lập mối quan hệ"
    ],
    synonyms: [
      "set up: thiết lập",
      "found: sáng lập",
      "create: tạo dựng"
    ],
    distractors: ["giải thể", "thu hẹp", "di dời"]
  },
  {
    id: 8,
    word: "obligate",
    pos: "verb",
    ipa_uk: "/ˈɒblɪɡeɪt/",
    ipa_us: "/ˈɑːblɪɡeɪt/",
    vi: "bắt buộc, ràng buộc",
    example: "Signing the lease obligates the tenant to pay rent for the full twelve-month period.",
    exampleVi: "Việc ký hợp đồng thuê bắt buộc người thuê phải trả tiền thuê trong suốt mười hai tháng.",
    collocations: [
      "legally obligated: bị ràng buộc pháp lý",
      "obligated to comply: bắt buộc tuân thủ",
      "feel obligated: cảm thấy có nghĩa vụ"
    ],
    synonyms: [
      "require: yêu cầu",
      "compel: buộc",
      "bind: ràng buộc"
    ],
    distractors: ["miễn trừ", "cho phép", "khuyến khích"]
  },
  {
    id: 9,
    word: "party",
    pos: "noun",
    ipa_uk: "/ˈpɑːti/",
    ipa_us: "/ˈpɑːrti/",
    vi: "bên (tham gia hợp đồng)",
    example: "The injured party has the right to seek compensation under the terms of the contract.",
    exampleVi: "Bên bị thiệt hại có quyền yêu cầu bồi thường theo các điều khoản của hợp đồng.",
    collocations: [
      "third party: bên thứ ba",
      "contracting party: bên ký kết",
      "injured party: bên bị thiệt hại"
    ],
    synonyms: [
      "side: phía",
      "entity: thực thể",
      "participant: bên tham gia"
    ],
    distractors: ["trọng tài", "nhân chứng", "cổ đông"]
  },
  {
    id: 10,
    word: "provision",
    pos: "noun",
    ipa_uk: "/prəˈvɪʒn/",
    ipa_us: "/prəˈvɪʒn/",
    vi: "điều khoản, quy định",
    example: "According to the provisions of the contract, payment must be made within 60 days.",
    exampleVi: "Theo các điều khoản của hợp đồng, việc thanh toán phải được thực hiện trong vòng 60 ngày.",
    collocations: [
      "key provision: điều khoản chính",
      "legal provision: quy định pháp luật",
      "make provisions for: đưa ra các quy định cho"
    ],
    synonyms: [
      "clause: điều khoản",
      "stipulation: quy định",
      "term: điều kiện"
    ],
    distractors: ["phụ lục", "bản nháp", "biên nhận"]
  },
  {
    id: 11,
    word: "resolve",
    pos: "verb",
    ipa_uk: "/rɪˈzɒlv/",
    ipa_us: "/rɪˈzɑːlv/",
    vi: "giải quyết",
    example: "The two parties were able to resolve their dispute without going to court.",
    exampleVi: "Hai bên đã có thể giải quyết tranh chấp mà không cần ra tòa.",
    collocations: [
      "resolve a dispute: giải quyết tranh chấp",
      "resolve a conflict: giải quyết xung đột",
      "resolve an issue: giải quyết vấn đề"
    ],
    synonyms: [
      "settle: dàn xếp",
      "sort out: xử lý",
      "work out: tìm ra giải pháp"
    ],
    distractors: ["leo thang", "gây ra", "trốn tránh"]
  },
  {
    id: 12,
    word: "specify",
    pos: "verb",
    ipa_uk: "/ˈspesɪfaɪ/",
    ipa_us: "/ˈspesɪfaɪ/",
    vi: "chỉ rõ, quy định cụ thể",
    example: "The agreement specifies that all deliveries must be made before 5 p.m. on weekdays.",
    exampleVi: "Thỏa thuận quy định cụ thể rằng tất cả giao hàng phải được thực hiện trước 5 giờ chiều các ngày trong tuần.",
    collocations: [
      "clearly specify: chỉ rõ ràng",
      "specify the terms: quy định điều khoản",
      "specify requirements: nêu rõ yêu cầu"
    ],
    synonyms: [
      "state: nêu rõ",
      "define: xác định",
      "detail: chi tiết hóa"
    ],
    distractors: ["khái quát", "bỏ sót", "ước lượng"]
  }
];
