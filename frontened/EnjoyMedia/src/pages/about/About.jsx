
import { Link } from "react-router-dom"
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company dedicated to providing the best services to our customers.</p>
      <Link to={"/home"}>Go to Home Page</Link>
    </div>
  )
}

