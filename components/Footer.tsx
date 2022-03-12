import {
  Facebook, Twitter, Instagram, Rss,
} from '@icons-pack/react-simple-icons';

function Footer() {
  return (
    <div className="bg-[#222222] mt-auto text-white p-5 flex flex-col space-y-3">
      <div className="flex justify-center space-x-5">
        <Facebook className="cursor-pointer" />
        <Twitter className="cursor-pointer" />
        <Instagram className="cursor-pointer" />
        <Rss className="cursor-pointer" />
      </div>
      <div className="flex flex-wrap items-center justify-center space-x-6 ">
        <p className="cursor-pointer">Sitemap</p>
        <p className="cursor-pointer">About</p>
        <p className="cursor-pointer">Store</p>
        <p className="cursor-pointer">Accesibiliy</p>
        <p className="cursor-pointer">Privacy</p>
        <p className="cursor-pointer">Terms of use</p>
        <p className="cursor-pointer">Advertising</p>
        <p className="cursor-pointer">Jobs</p>
      </div>
    </div>
  );
}

export default Footer;
