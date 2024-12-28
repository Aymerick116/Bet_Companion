
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to Soccer Bets!</h1>
    <p>Your one-stop platform for tracking and managing soccer betting stats.</p>
    
    <div style={{ marginTop: '20px' }}>
      <Link to="/login" style={{ marginRight: '10px' }}>
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  </div>
);

export default HomePage;
