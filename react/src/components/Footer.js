import "../Assets/CSS/Footer.css";
import { Container } from "react-bootstrap";
const Footer = () => {
  return (
    <footer className="py-5 my5 bg-dark footer-bottom">
      <Container className="px-4  footer-bottom">
        <p className="text-white text-center">
          Copyright &copy; Matthew Bird/RMIT 2022
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
