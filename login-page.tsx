import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

const LoginPage = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    course: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UserCircle className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">University</label>
              <Input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="Enter your university"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Course Interest</label>
              <Input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="What course are you interested in?"
                className="w-full"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
