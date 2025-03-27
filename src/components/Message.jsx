const Message = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="max-w-[75%] py-4 px-6 rounded-t-2xl rounded-bl-2xl text-base backdrop-blur-sm bg-[#F2F2F2] text-[#333333]">
          {message}
        </div>
      ) : (
        <div className="text-2xl font-semibold max-w-[75%]">
          {message}
        </div>
      )}
    </div>
  );
};

export default Message;
