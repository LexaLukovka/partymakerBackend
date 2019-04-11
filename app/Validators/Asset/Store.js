class StoreAsset {
  get rules() {
    return {
      file: 'file|file_size:2mb'
    }
  }
}

module.exports = StoreAsset
