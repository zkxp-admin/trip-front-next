import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="hero text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Next Adventure Together</h1>
          <p className="text-xl mb-8">Create or join a group trip and make it happen!</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link 
              href="/create" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center w-full"
            >
              Create a Trip
            </Link>
            <Link 
              href="/join" 
              className="bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold py-3 px-6 border border-blue-600 dark:border-blue-400 rounded-lg text-center w-full"
            >
              Join a Trip
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
