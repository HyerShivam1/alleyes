/* eslint-disable react/prop-types */
import { IoCloseOutline } from "react-icons/io5";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  LinkedinIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ShareToSocial = ({ sharePopup, handleSharePopup, shareUrl }) => {
  const defaultShareUrl = "";

  return (
    <div>
      {sharePopup && (
        <div
          className="h-screen w-screen fixed top-0 left-0 z-10 backdrop-blur-sm flex items-center justify-center"
          onClick={() => handleSharePopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="font-semibold">SHARE THIS PRODUCT</h2>
              <IoCloseOutline
                className="text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => handleSharePopup(false)}
                size={30}
              />
            </div>

            {/* Icons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              <FacebookIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on Facebook"
                title="Facebook"
              />
              <EmailIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share via Email"
                title="Email"
              />
              <FacebookMessengerIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on Messenger"
                title="Messenger"
              />
              <InstapaperIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on Instapaper"
                title="Instapaper"
              />
              <RedditIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on Reddit"
                title="Reddit"
              />
              <WhatsappIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on WhatsApp"
                title="WhatsApp"
              />
              <TwitterIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on Twitter"
                title="Twitter"
              />
              <TelegramIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on Telegram"
                title="Telegram"
              />
              <PocketIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Save to Pocket"
                title="Pocket"
              />
              <PinterestIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Pin on Pinterest"
                title="Pinterest"
              />
              <LinkedinIcon
                className="cursor-pointer"
                round={true}
                url={shareUrl || defaultShareUrl}
                aria-label="Share on LinkedIn"
                title="LinkedIn"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareToSocial;
