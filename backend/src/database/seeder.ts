import db from ".";
import { Booking, bookings as BookingTable } from "./schema";

export async function seedExampleBookings() {
  const bookings: Booking[] = [
    {
      email: "test@email.com",
      fullName: "Test Name",
      id: 3,
      phone: "1234567",
    },
  ];
  for (const booking of bookings) {
    await db.insert(BookingTable).values(booking);
  }
}
(async () => {
  console.log("Seeding DB");
  seedExampleBookings();
  console.log("DB Seeded Successfully");
  return;
})();
