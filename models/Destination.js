class Destination {
  constructor(
    id,
    firebaseId,
    ownerId,
    categoryIds,
    placeName,
    location,
    fullAddress,
    contactManager,
    description,
    destImage,
    ratingOnTen,
    noOfRatings,
    isVegetarian,
    pricingForCombos
  ) {
      this.id = id;
      this.firebaseId = firebaseId;
      this.ownerId = ownerId;
      this.categoryIds = categoryIds;
      this.placeName = placeName;
      this.location = location;
      this.fullAddress = fullAddress;
      this.contactManager = contactManager;
      this.description = description;
      this.destImage = destImage;
      this.ratingOnTen = ratingOnTen;
      this.noOfRatings = noOfRatings;
      this.isVegetarian = isVegetarian;
      this.pricingForCombos = pricingForCombos;
  }
}

export default Destination;
