import axios from "axios";

export default async function Page() {
  try {
    const { data } = await axios.get("http://localhost:3001/api/bookings");
    if (!data) return <h1>No bookings</h1>;
    return (
      <div>
        {data.map((it) => (
          <section className="flex flex-row flex-wrap p-3" key={it.id}>
            <div className="p-2">
              <h1>{it.fullName}</h1>
              <h1>{it.email}</h1>
              <h1>{it.phone}</h1>
            </div>
          </section>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return <h1>Failed to load bookings</h1>;
  }
}
