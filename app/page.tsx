export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Hackathon
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Build amazing projects. Connect with innovators. Change the world.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🚀 Build</h3>
            <p className="text-slate-400">Create your project in 48 hours</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🤝 Connect</h3>
            <p className="text-slate-400">Meet talented developers and designers</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🏆 Win</h3>
            <p className="text-slate-400">Compete for amazing prizes</p>
          </div>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition">
          Register Now
        </button>
      </div>
    </main>
  );
}
