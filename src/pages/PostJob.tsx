import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { ROLES, DISTRICTS } from '@/src/constants';

export function PostJob() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    requiredRole: '',
    location: '',
    isPaid: 'true',
    budget: '',
    deadline: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isPaid: formData.isPaid === 'true'
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to post job');
      }

      navigate('/jobs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Post a Project</h1>
        <p className="text-gray-400">Find the right talent for your next masterpiece.</p>
      </div>

      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <Input
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Short Film: The Last Letter"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Required Role"
                name="requiredRole"
                value={formData.requiredRole}
                onChange={handleChange}
                options={ROLES.map(r => ({ label: r, value: r }))}
                required
              />
              <Select
                label="Location (District)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                options={DISTRICTS.map(d => ({ label: d, value: d }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Compensation Type"
                name="isPaid"
                value={formData.isPaid}
                onChange={handleChange}
                options={[
                  { label: 'Paid', value: 'true' },
                  { label: 'Unpaid / Collaboration', value: 'false' }
                ]}
                required
              />
              <Input
                label="Budget (Optional)"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. 5000 BDT / Day"
                disabled={formData.isPaid === 'false'}
              />
            </div>

            <Input
              label="Application Deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="flex w-full rounded-md border border-white/10 bg-cinema-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none"
                placeholder="Describe the project, requirements, and what you're looking for..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" isLoading={isLoading}>Post Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
