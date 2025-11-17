
import React, { useState, useCallback, useMemo } from 'react';
import { MemoryData } from './types';
import { generateMemory } from './services/geminiService';
import { Logo, LoadingSpinner, MapPinIcon, CameraIcon, MusicIcon, SocialIcon, CalendarIcon } from './components/icons';
import InfoCard from './components/InfoCard';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [memoryData, setMemoryData] = useState<MemoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleReliveDay = useCallback(async () => {
    if (!selectedDate) return;
    setIsLoading(true);
    setError(null);
    setMemoryData(null);
    setShowIntro(false);

    try {
      const date = new Date(selectedDate);
      const data = await generateMemory(date);
      setMemoryData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);
  
  const backgroundStyle = useMemo(() => {
    if (memoryData) {
        return {
            background: `radial-gradient(circle at top, hsl(from ${memoryData.colorTheme.from.replace('from-','')}-500 h s l / 0.15), transparent 60%), radial-gradient(circle at bottom, hsl(from ${memoryData.colorTheme.to.replace('to-','')}-500 h s l / 0.15), transparent 60%)`,
        };
    }
    return {
        background: `radial-gradient(circle at top, rgba(168, 85, 247, 0.1), transparent 60%), radial-gradient(circle at bottom, rgba(59, 130, 246, 0.1), transparent 60%)`
    };
  }, [memoryData]);

  return (
    <div style={backgroundStyle} className="min-h-screen bg-[#0B0A10] text-white font-sans transition-all duration-1000">
      <div className="container mx-auto px-4 py-8">
        
        <header className="flex items-center justify-center gap-4 mb-8 animate-fade-in-down">
          <Logo />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Tenvix
          </h1>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-500/10 mb-8">
            <h2 className="text-lg md:text-xl text-center text-gray-300 mb-6">Select a day to reconstruct and relive.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative w-full sm:w-auto">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-4 py-3 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleReliveDay}
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'Reconstructing...' : 'Relive This Day'}
              </button>
            </div>
          </div>
          
          {isLoading && (
            <div className="text-center py-10 animate-fade-in">
              <LoadingSpinner />
              <p className="mt-4 text-lg text-gray-400">Reconstructing your memory from the digital ether...</p>
            </div>
          )}

          {error && (
             <div className="text-center py-10 bg-red-900/20 border border-red-500 rounded-xl p-4 animate-fade-in">
                <h3 className="text-xl font-bold text-red-400">An Error Occurred</h3>
                <p className="mt-2 text-red-300">{error}</p>
             </div>
          )}
          
          {showIntro && !isLoading && !memoryData && (
             <div className="text-center py-16 px-6 bg-gray-900/20 border border-dashed border-gray-700 rounded-2xl animate-fade-in">
                <CalendarIcon className="w-16 h-16 mx-auto text-gray-600 mb-4"/>
                <h2 className="text-3xl font-bold text-gray-300">Your Past Awaits</h2>
                <p className="mt-2 max-w-xl mx-auto text-gray-400">
                    Pick any date from your past. Our AI will construct an immersive emotional recreation of that day based on millions of simulated digital footprints.
                </p>
             </div>
          )}
          
          {memoryData && (
            <div className="space-y-8 animate-fade-in-up">
              <div className={`text-center p-8 rounded-2xl bg-gradient-to-br ${memoryData.colorTheme.from} ${memoryData.colorTheme.to}`}>
                <h2 className="text-3xl font-bold">A {memoryData.emotion} Day</h2>
                <p className="mt-2 text-gray-200 max-w-2xl mx-auto">{memoryData.summary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoCard title="Locations Visited" icon={<MapPinIcon className="w-8 h-8"/>}>
                  {memoryData.locations.map((loc, index) => (
                    <div key={index}>
                        <p className="font-semibold text-gray-300">{loc.name}</p>
                        <p className="text-sm">{loc.description}</p>
                    </div>
                  ))}
                </InfoCard>
                <InfoCard title="Musical Backdrop" icon={<MusicIcon className="w-8 h-8"/>}>
                  {memoryData.music.map((m, index) => (
                    <div key={index}>
                        <p className="font-semibold text-gray-300">{m.song}</p>
                        <p className="text-sm">by {m.artist}</p>
                    </div>
                  ))}
                </InfoCard>
                <InfoCard title="Captured Moments" icon={<CameraIcon className="w-8 h-8"/>}>
                  <div className="space-y-4">
                    {memoryData.photos.map((photo, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                           <img src={`${photo.url}?random=${index}`} alt={photo.description} className="rounded-lg w-full h-48 object-cover"/>
                           <p className="text-sm italic text-center">"{photo.description}"</p>
                        </div>
                    ))}
                  </div>
                </InfoCard>
                <InfoCard title="Digital Echo" icon={<SocialIcon className="w-8 h-8"/>}>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-400">@{memoryData.socialPost.platform}</p>
                    <p className="mt-1">"{memoryData.socialPost.content}"</p>
                  </div>
                </InfoCard>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;