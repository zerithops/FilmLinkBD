import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Select } from '@/src/components/ui/Select';
import { ROLES, DISTRICTS } from '@/src/constants';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';

export function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [roleFilter, locationFilter]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter) params.append('role', roleFilter);
      if (locationFilter) params.append('location', locationFilter);
      
      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-white mb-4">Explore Projects</h1>
        <p className="text-gray-400 max-w-2xl">Find your next gig. Filter by role and location to find the perfect match for your skills.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-64">
          <Select
            options={ROLES.map(r => ({ label: r, value: r }))}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-cinema-800"
          />
        </div>
        <div className="w-full md:w-64">
          <Select
            options={DISTRICTS.map(d => ({ label: d, value: d }))}
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-cinema-800"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => { setRoleFilter(''); setLocationFilter(''); }}
          className="md:w-auto"
        >
          Clear Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-xl">
          <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p className="text-gray-400">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:border-gold-500/30 transition-colors group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-400 border border-gold-500/20">
                      {job.requiredRole}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${job.isPaid ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                      {job.isPaid ? 'Paid' : 'Unpaid / Collab'}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-gold-400 transition-colors line-clamp-2">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">{job.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    {job.budget && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>{job.budget}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full">View Details</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
