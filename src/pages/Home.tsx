import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Camera, Clapperboard, Music, PenTool, Scissors, Users } from 'lucide-react';

const ROLES = [
  { name: 'Directors', icon: Clapperboard, count: '120+' },
  { name: 'Cinematographers', icon: Camera, count: '85+' },
  { name: 'Actors', icon: Users, count: '300+' },
  { name: 'Writers', icon: PenTool, count: '60+' },
  { name: 'Editors', icon: Scissors, count: '90+' },
  { name: 'Music Producers', icon: Music, count: '45+' },
];

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cinema-900/90 mix-blend-multiply" />
          <img 
            src="https://picsum.photos/seed/cinema/1920/1080?blur=2" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-900 via-cinema-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-900 via-transparent to-cinema-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Connect with Bangladesh's <br />
              <span className="text-gradient-gold">Finest Filmmakers</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              The premier platform for directors, actors, cinematographers, and crew to collaborate on films, web series, and short films across BD.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Join the Network
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 bg-cinema-800 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Find the Perfect Talent</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover professionals across all major filmmaking disciplines ready to bring your vision to life.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ROLES.map((role, index) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center group hover:border-gold-500/30 transition-colors cursor-pointer"
              >
                <div className="h-14 w-14 rounded-full bg-cinema-700 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                  <role.icon className="h-7 w-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{role.name}</h3>
                <p className="text-sm text-gray-400">{role.count} Active</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
