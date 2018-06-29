module.exports = class CreateCargo {
  get rules() {
    return {
      name: 'required',
      from: 'required',
      to: 'required',
      date_from: 'required|date',
      date_to: 'required|date',
      price: 'required|number',
      volume: 'required|number',
      weight: 'required|number',
      description: 'required',
      from_lat: 'required|number',
      from_lng: 'required|number',
      from_placeId: 'required',
      to_lat: 'required|number',
      to_lng: 'required|number',
      to_placeId: 'required',
    }
  }
}
