import React, { useState } from "react";

const categories = ["Face", "Style", "Background", "Lighting"];

export default function App() {
  const [entries, setEntries] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [newImage, setNewImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleUpload = () => {
    if (!newImage || !newPrompt) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newEntry = {
        image: reader.result,
        prompt: newPrompt,
        category: newCategory,
      };
      setEntries([newEntry, ...entries]);
      setNewPrompt("");
      setNewCategory(categories[0]);
      setNewImage(null);
    };
    reader.readAsDataURL(newImage);
  };

  const copyPrompt = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filteredEntries = entries.filter((entry) => entry.category === activeCategory);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">MidJourney Prompt Vault</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter prompt text..."
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          className="border rounded p-2"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleUpload}
          className="col-span-1 sm:col-span-3 bg-blue-500 text-white py-2 rounded"
        >
          Upload Prompt
        </button>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded border ${
              cat === activeCategory ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map((entry, idx) => (
          <div key={idx} className="border rounded overflow-hidden">
            <img
              src={entry.image}
              alt="Uploaded"
              className="w-full aspect-[9/16] object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">Category: {entry.category}</p>
              <p className="text-sm mb-4 line-clamp-2">{entry.prompt}</p>
              <button
                className="px-4 py-1 border rounded text-sm"
                onClick={() => copyPrompt(entry.prompt)}
              >
                Copy Prompt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}