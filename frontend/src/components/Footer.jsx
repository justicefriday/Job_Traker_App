const Footer = () => {
  return (
    <footer className="bg-primary text-white py-5 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;