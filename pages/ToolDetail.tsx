
import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GoogleGenAI, Modality } from "@google/genai";
import { TOOLS } from '../constants';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS.find(t => t.id === id);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!tool) return <div className="p-20 text-center">Outil non trouvé</div>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const runIA = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (tool.function === 'scribe') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: input,
          config: { systemInstruction: "Tu es Lumina Scribe, une IA poétique et précise." }
        });
        setOutput(response.text || "Aucun résultat.");
      } 
      
      else if (tool.function === 'alchemy') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: input }] },
          config: { imageConfig: { aspectRatio: "1:1" } }
        });
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setOutput(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }

      else if (tool.function === 'aura') {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: input }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
          },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          setOutput(`data:audio/pcm;base64,${base64Audio}`);
        }
      }

      else if (tool.function === 'lens' && imageFile) {
        const base64Data = imageFile.split(',')[1];
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: {
            parts: [
              { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
              { text: input || "Analyse cette image en détail." }
            ]
          }
        });
        setOutput(response.text || "Analyse terminée.");
      }

    } catch (err) {
      console.error(err);
      setOutput("Erreur lors de la génération. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        to="/outils" 
        className="inline-flex items-center text-indigo-600 font-medium mb-8 transition-colors group hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour aux outils
      </Link>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className={`p-8 bg-gradient-to-r ${tool.color} text-white`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
          </div>
          <p className="opacity-90">{tool.description}</p>
        </div>

        <div className="p-8 space-y-6">
          {tool.function === 'lens' && (
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50">
              {imageFile ? (
                <img src={imageFile} className="max-h-64 mx-auto rounded-lg mb-4" alt="Preview" />
              ) : (
                <div className="text-slate-400">Cliquez pour uploader une image</div>
              )}
              <input type="file" onChange={handleImageUpload} className="hidden" id="img-upload" accept="image/*" />
              <label htmlFor="img-upload" className="cursor-pointer text-indigo-600 font-bold">Choisir un fichier</label>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {tool.function === 'alchemy' ? 'Décrivez votre vision :' : 'Votre texte :'}
            </label>
            <textarea
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-32 resize-none"
              placeholder="Exemple: Un chat cosmique voyageant à travers une nébuleuse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <button
            onClick={runIA}
            disabled={loading || (!input && tool.function !== 'lens')}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-indigo-600 shadow-lg shadow-indigo-100'}`}
          >
            {loading ? 'Génération en cours...' : 'Exécuter l\'outil'}
          </button>

          {output && (
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-bold mb-4 text-slate-900 uppercase text-xs tracking-widest">Résultat :</h3>
              
              {tool.function === 'alchemy' ? (
                <img src={output} alt="IA Generated" className="w-full rounded-xl shadow-lg" />
              ) : tool.function === 'aura' ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <audio ref={audioRef} controls src={output} className="w-full" />
                  </div>
                  <p className="text-xs text-slate-400">Note: Le format audio généré est lu directement via les capacités de votre navigateur.</p>
                </div>
              ) : (
                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{output}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
