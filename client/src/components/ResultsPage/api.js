let queryURL = `https://developer.goibibo.com/api/search/?app_id=${AppId}&app_key=${APIKey}&format=json&source=${IAPASrc}&destination=${IAPADest}&dateofdeparture=${DeptDate}&dateofarrival=${ArrDate}&seatingclass=${SeatClass}&adults=${NumAdults}&children=0&infants=0&counter=100`

let queryURL = "http://developer.goibibo.com/api/search/?app_id=ad6a1a69&app_key=dcf3fe52cb4920b668f623315303b99f&format=json&source=JFK&destination=ATL&dateofdeparture=20181219&dateofarrival=20181220&seatingclass=E&adults=1&children=0&infants=0&counter=100"

$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function (response) {
  console.log(response);
  console.log('Departure Airport:', response.data.onwardflights[0].origin);
  console.log('Departure Time:', response.data.onwardflights[0].deptime);
  console.log('Flight Duration:', response.data.onwardflights[0].duration);
  console.log('Destination:', response.data.onwardflights[0].destination);
  console.log('Airline:', response.data.onwardflights[0].airline);
  console.log('Arrival Date:', response.data.onwardflights[0].arrdate)
  console.log('Total Fare:', response.data.onwardflights[0].fare.adulttotalfare);
  //return flight info
  console.log('Return Flight Origin:', response.data.onwardflights[0].returnfl[0].origin);
  console.log('Return Flight Departure Time:', response.data.onwardflights[0].returnfl[0].deptime);
  console.log('Return Flight Duration:', response.data.onwardflights[0].returnfl[0].duration);
  console.log('Return Flight Destination:', response.data.onwardflights[0].returnfl[0].destination);
  console.log('Return Flight Airline:', response.data.onwardflights[0].returnfl[0].airline);
  console.log('Return Flight Arrival Date:', response.data.onwardflights[0].returnfl[0].arrdate);
});