"use client";
import { useState, useEffect } from "react";
import { signIn, logOut, addMessage, getMessages, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    async function fetchMessages() {
      const msgs = await getMessages();
      setMessages(msgs);
    }
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (text.trim()) {
      await addMessage(text, user?.displayName || "Anonymous");
      setText("");
      setMessages(await getMessages()); // Refresh messages
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {!user ? (
        <button
          onClick={signIn}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-xl font-bold mb-4">Welcome, {user.displayName}</h1>
            <button
              onClick={logOut}
              className="text-red-500 underline mb-4"
            >
              Logout
            </button>

            <div className="mb-4">
              {messages.map((msg) => (
                <p key={msg.id} className="bg-gray-200 p-2 rounded-lg my-2">
                  <strong>{msg.user}:</strong> {msg.text}
                </p>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
