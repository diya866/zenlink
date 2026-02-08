import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState(["", "", ""]);
  const [status, setStatus] = useState("");

  const saveProfile = async () => {
    setStatus("Saving...");

    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, links }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Profile saved successfully!");
      } else {
        setStatus("❌ Failed to save profile");
      }
    } catch (err) {
      setStatus("❌ Backend not running");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white flex items-center justify-center">
      <div className="w-[900px] grid grid-cols-2 gap-8">
        
        {/* LEFT FORM */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">ZenLink ✨</h1>

          <input
            className="w-full p-3 rounded bg-white/10"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded bg-white/10"
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          {links.map((link, i) => (
            <input
              key={i}
              className="w-full p-3 rounded bg-white/10"
              placeholder={`Link ${i + 1}`}
              value={link}
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[i] = e.target.value;
                setLinks(newLinks);
              }}
            />
          ))}

          <button
            onClick={saveProfile}
            className="w-full py-3 rounded bg-white/20 hover:bg-white/30 transition"
          >
            Save Profile
          </button>

          {status && <p className="text-sm">{status}</p>}
        </div>

        {/* RIGHT LIVE PREVIEW */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold">{name || "Your Name"}</h2>
          <p className="text-sm opacity-80">{bio || "Your bio appears here"}</p>

          <div className="mt-4 space-y-2">
            {links.map(
              (l, i) =>
                l && (
                  <div
                    key={i}
                    className="bg-white/20 rounded py-2 px-3 text-sm"
                  >
                    {l}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
