import { Link } from 'react-router-dom'
// Link is used to avoid refreshing like an a href tag
const About = () => {
  return (
    <>
    <h4>Version 1.0.0</h4>
    <Link to='/'>Go Back</Link>
    </>
  )
}

export default About