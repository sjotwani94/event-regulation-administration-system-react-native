class Bookings {
  constructor(
    id,
    userId,
    destId,
    typeOfEvent,
    numberOfMembers,
    startDuration,
    endDuration,
    comboTypePriceQuantity,
    totalBill
  ) {
    this.id = id;
    this.userId = userId;
    this.destId = destId;
    this.typeOfEvent = typeOfEvent;
    this.numberOfMembers = numberOfMembers;
    this.startDuration = startDuration;
    this.endDuration = endDuration;
    this.comboTypePriceQuantity = comboTypePriceQuantity;
    this.totalBill = totalBill;
  }
}

export default Bookings;
