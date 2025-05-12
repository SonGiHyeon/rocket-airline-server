const flights = require('../repository/flightList');

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: (req, res) => {
    // TODO:
    // return res.status(200).send('not implemented');
    const { departure, destination, departure_times, arrival_times } = req.query;

    let result = flights;

    if (departure) {
      result = result.filter(flight => flight.departure === departure);
    }
    if (destination) {
      result = result.filter(flight => flight.destination === destination);
    }
    if (departure_times) {
      result = result.filter(flight => flight.departure_times === departure_times);
    }
    if (arrival_times) {
      result = result.filter(flight => flight.arrival_times === arrival_times);
    }
    return res.status(200).json(result);
  },
  // [GET] /flight/:id
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    const flight = flights.find(f => f.uuid === req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    return res.status(200).json([flight]);
  },

  // [PUT] /flight/:id 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    const { id } = req.params;
    const { departure, destination, departure_times, arrival_times } = req.body;

    const flight = flights.find(f => f.uuid === id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // 필드 업데이트
    if (departure) flight.departure = departure;
    if (destination) flight.destination = destination;
    if (departure_times) flight.departure_times = departure_times;
    if (arrival_times) flight.arrival_times = arrival_times;

    return res.status(200).json(flight);
  },
};
