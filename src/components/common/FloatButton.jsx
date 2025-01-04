import "../styles/features.css";

const FloatButton = () => {
  const handleSendMessage = () => {
    const phoneNumber = "1111111111";
    const message = encodeURIComponent("Hello, I'd like to connect with you!");
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <button onClick={handleSendMessage} className="btn-floating whatsapp">
        <img src="https://i.imgur.com/LBW2Lso.png" alt="WhatsApp" />
        <span>(+91) 1111111111</span>
      </button>
    </div>
  );
};

export default FloatButton;
