import API_URL from '../config';

export const createJobOpening = async (jobData) => {
    try{
        const data = await fetch(`${API_URL}/jobOpenings`,{
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: jobData.title, employmentType: jobData.type, location: jobData.location, description: jobData.description, department: jobData.department, salaryRange: jobData.salaryRange, jobStatus: "active"})
        })
        return data.json();
    }
    catch (err){
        console.log("JobOpening service layer error: ",err);
    }
}

export const updateJobStatus = async (jobId) => {
    try{
        const data = await fetch(`${API_URL}/jobOpenings/${jobId}`,{
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({jobStatus: "inactive"})
        })
        return data.json();
    }
    catch (err){
        console.log("JobOpeningUpdate service layer error: ",err);
    }
}

export const allJobApplications = async () => {
    try{
        const data = await fetch(`${API_URL}/jobApplications`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return data.json();
    }
    catch (err){
        console.log("JobApplications service layer error: ",err);
    }
}

export const allJobOpenings = async () => {
    try{
        const data = await fetch(`${API_URL}/jobOpenings`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return data.json();
    }
    catch (err){
        console.log("JobOpenings service layer error: ",err);
    }
}