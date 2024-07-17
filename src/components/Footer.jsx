function Footer() {
  const currentDate = new Date().getFullYear();
  //   console.log(currentDate);
  return (
    <footer>
      <p>Copyright &copy;{currentDate}</p>
    </footer>
  );
}

export default Footer;
