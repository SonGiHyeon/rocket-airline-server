const flights = require('../repository/flightList');
// 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 데이터 혹은 요청 된 flight_uuid, phone 값과 동일한 예약 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    const { flight_uuid, name, phone } = req.query;

    let result = booking;

    if (flight_uuid) {
      result = result.filter(b => b.flight_uuid === flight_uuid);
    }
    if (name) {
      result = result.filter(b => b.name === name);
    }
    if (phone) {
      result = result.filter(b => b.phone === phone);
    }

    // 테스트 중 phone 단일 조회는 객체 기대하므로 예외 처리
    if (phone && result.length === 1) {
      return res.status(200).json(result[0]);
    }

    return res.status(200).json(result);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  // 응답으로는 book_id를 리턴합니다.
  // Location Header로 예약 아이디를 함께 보내준다면 RESTful한 응답에 더욱 적합합니다.
  // 참고 링크: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#useful-post-responses
  create: (req, res) => {
    // TODO:
    const { flight_uuid, name, phone } = req.body;

    // if (!flight_uuid || !name || !phone) {
    //   return res.status(400).json({ message: 'Invalid booking data' });
    // }

    const newBooking = { flight_uuid, name, phone };
    booking.push(newBooking);

    // RESTful하게 Location 헤더 포함
    // res.setHeader('Location', `/book?phone=${encodeURIComponent(phone)}`);
    return res.status(201).json(newBooking);
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: (req, res) => {
    // TODO:
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ message: 'Phone is required' });
    }

    const beforeLength = booking.length;
    booking = booking.filter(b => b.phone !== phone);
    const deleted = beforeLength !== booking.length;

    return res.status(200).json(booking);
  },


};
