class Bookings {
  constructor(
    id,
    firebaseId,
    userId,
    ownerId,
    destId,
    typeOfEvent,
    numberOfMembers,
    startDuration,
    endDuration,
    comboTypePriceQuantity,
    totalBill,
    paymentReceived
  ) {
    this.id = id;
    this.firebaseId = firebaseId;
    this.userId = userId;
    this.ownerId = ownerId;
    this.destId = destId;
    this.typeOfEvent = typeOfEvent;
    this.numberOfMembers = numberOfMembers;
    this.startDuration = startDuration;
    this.endDuration = endDuration;
    this.comboTypePriceQuantity = comboTypePriceQuantity;
    this.totalBill = totalBill;
    this.paymentReceived = paymentReceived;
  }
}

export default Bookings;
