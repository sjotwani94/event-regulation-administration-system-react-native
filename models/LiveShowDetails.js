class LiveShowDetails {
  constructor(
    id,
    categoryIds,
    eventName,
    performers,
    genreOfEvent,
    location,
    contactOfManager,
    contactOfHost,
    description,
    duration,
    eventForImage,
    pricingForEntry,
    isEighteenPlus
  ) {
      this.id = id;
      this.categoryIds = categoryIds;
      this.eventName = eventName;
      this.performers = performers;
      this.genreOfEvent = genreOfEvent;
      this.location = location;
      this.contactOfManager = contactOfManager;
      this.contactOfHost = contactOfHost;
      this.description = description;
      this.duration = duration;
      this.eventForImage = eventForImage;
      this.pricingForEntry = pricingForEntry;
      this.isEighteenPlus = isEighteenPlus;
  }
}

export default LiveShowDetails;
