import { useAuthStore } from '@/src/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { User, Briefcase, FileText, Settings } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-cinema-700 border-2 border-gold-500/50 flex items-center justify-center overflow-hidden">
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <User className="h-10 w-10 text-gray-400" />
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-gold-400 font-medium">{user.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-panel border-white/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Jobs Posted</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-white/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Applications Sent</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 cursor-pointer hover:border-gold-500/30 transition-colors">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Profile Settings</p>
              <p className="text-base font-medium text-white">Edit Profile</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-400">
              You haven't applied to any jobs yet.
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">Your Posted Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-400">
              You haven't posted any jobs yet.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
