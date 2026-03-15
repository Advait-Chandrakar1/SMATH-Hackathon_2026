import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-blue-50 to-sky-100 px-6 py-24">
      <div className="mx-auto max-w-lg">
        <ProfileClient />
      </div>
    </main>
  );
}
