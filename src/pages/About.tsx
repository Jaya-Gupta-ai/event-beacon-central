
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">About Event Beacon</h1>
        
        <div className="space-y-6">
          <p>
            Event Beacon is a platform designed to help college students discover and share tech events 
            happening at universities across the country. Our mission is to make it easier for students 
            to find valuable opportunities for learning, networking, and skill development.
          </p>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Event Discovery:</strong> Browse through hackathons, workshops, tech talks, and more from top colleges.
              </li>
              <li>
                <strong>Event Submission:</strong> Add events you know about to help grow our community database.
              </li>
              <li>
                <strong>Advanced Filters:</strong> Easily find events by type, college, date, or keywords.
              </li>
              <li>
                <strong>Event Details:</strong> Get all the information you need about each event in one place.
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">How It Works</h2>
            <p>
              Event Beacon aggregates events from college websites and user submissions to create a 
              comprehensive database of tech-related activities. Whether you're looking for a hackathon 
              to join, a workshop to expand your skills, or a tech talk to learn from industry experts, 
              you can find it all in one place.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Get Involved</h2>
            <p>
              Help us grow the platform by submitting events you know about or sharing Event Beacon with 
              your network. The more people contribute, the more valuable this resource becomes for everyone 
              in the college tech community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
