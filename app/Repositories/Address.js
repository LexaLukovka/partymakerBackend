const Address = use('App/Models/Address')

class AddressRepository {

  create(address) {
    return Address.create({
      address: address.address,
      lng: address.lng,
      lat: address.lat,
      placeId: address.placeId,
    })
  }
}

module.exports = AddressRepository
