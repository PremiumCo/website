const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <p className="text-xs">
            Follow us on 
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Twitter</a>, 
            <a href="https://discord.gg/yourdiscord" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Discord</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;