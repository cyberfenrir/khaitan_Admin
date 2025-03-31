import React, { useState, useEffect } from 'react';
import { allJobApplications, allJobOpenings, createJobOpening } from '../../services/jobService';

const Careers = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState({
    applications: true,
    openings: true
  });
  const [error, setError] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    salaryRange: '',
    department: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch job applications
      try {
        setLoading(prev => ({ ...prev, applications: true }));
        const applications = await allJobApplications();
        setJobApplications(applications.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to load job applications. Please try again later.');
      } finally {
        setLoading(prev => ({ ...prev, applications: false }));
      }

      // Fetch job openings
      try {
        setLoading(prev => ({ ...prev, openings: true }));
        const openings = await allJobOpenings();
        console.log(openings);
        setJobOpenings(openings.data);
      } catch (error) {
        console.error('Error fetching job openings:', error);
        setError('Failed to load job openings. Please try again later.');
      } finally {
        setLoading(prev => ({ ...prev, openings: false }));
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await createJobOpening(newJob);
      
      // Add the new job to the job openings list
      setJobOpenings([...jobOpenings, response.data]);
      
      // Show success message
      const successMessage = document.getElementById('success-message');
      successMessage.classList.remove('hidden');
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 3000);
      
      // Reset form
      setNewJob({
        title: '',
        description: '',
        location: '',
        type: '',
        salaryRange: '',
        department: '',
      });
      
      // Close form after submission
      setShowForm(false);
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Failed to create job. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Careers</h1>
        <p className="text-gray-600">Manage job openings and applications</p>
      </div>

      {/* Success message */}
      <div id="success-message" className="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <p>Job created successfully!</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Create new job button */}
      <div className="mb-8">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          {showForm ? 'Cancel' : '+ Create New Job Opening'}
        </button>
      </div>

      {/* Create new job opening form */}
      {showForm && (
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Job Opening</h2>
          <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Senior Developer"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Remote, Kolkata, etc."
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Employment Type</label>
              <select
                name="type"
                value={newJob.type}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={newJob.salaryRange}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., ₹8,00,000 - ₹12,00,000"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Department</label>
              <select
                name="department"
                value={newJob.department}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job description..."
              />
            </div>
            
            <div className="md:col-span-2 mt-4">
              <button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
              >
                Create Job
              </button>
            </div>
          </form>
        </section>
      )}

      {/* List job openings */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Job Openings</h2>
        
        {loading.openings ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : jobOpenings.length === 0 ? (
          <p className="text-gray-500 italic">No job openings available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Department</th>
                  <th className="py-3 px-6 text-left">Location</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Salary Range</th>
                  <th className="py-3 px-6 text-left">Posted Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {jobOpenings.map((job, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">{job.title}</td>
                    <td className="py-3 px-6 text-left">{job.department}</td>
                    <td className="py-3 px-6 text-left">{job.location}</td>
                    <td className="py-3 px-6 text-left">{job.type}</td>
                    <td className="py-3 px-6 text-left">{job.salaryRange}</td>
                    <td className="py-3 px-6 text-left">{formatDate(job.createdAt)}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' :
                        job.status === 'Filled' ? 'bg-blue-100 text-blue-800' :
                        job.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* List job applications */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Applications</h2>
        
        {loading.applications ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : jobApplications.length === 0 ? (
          <p className="text-gray-500 italic">No job applications available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Position</th>
                  <th className="py-3 px-6 text-left">Date Applied</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {jobApplications.map((application, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{application.name}</td>
                    <td className="py-3 px-6 text-left">{application.email}</td>
                    <td className="py-3 px-6 text-left">{application.position || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{formatDate(application.dateApplied)}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        application.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'Interviewed' ? 'bg-purple-100 text-purple-800' :
                        application.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Careers;