import { Link } from 'react-router-dom'
// Link is used to avoid refreshing like an a href tag
const Footer = () => {
  return (
    <footer>
        <p>Copyright &copy; 2024</p>
        <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer