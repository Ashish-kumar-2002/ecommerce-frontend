import { useState } from "react";
import api from "../../api/api";

const ChatBox = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim() || loading) {
            return;
        }

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const { data } = await api.post(
                "/public/chat",
                {
                    message: userMessage
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: data.reply
                }
            ]);
        } catch (error) {
            console.error("CHAT ERROR =", error);
            console.error("STATUS =", error?.response?.status);
            console.error("DATA =", error?.response?.data);
            console.error("MESSAGE =", error?.message);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text:
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        error?.message ||
                        "Sorry, something went wrong."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Chat Button */}

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-5 right-5 z-50
                bg-blue-600 hover:bg-blue-700
                text-white rounded-full
                w-14 h-14 shadow-xl
                flex items-center justify-center
                text-2xl"
            >
                💬
            </button>

            {/* Chat Window */}

            {open && (
                <div
                    className="fixed bottom-24 right-5 z-50
                    w-[350px] max-w-[calc(100vw-30px)]
                    h-[500px]
                    bg-white rounded-xl
                    shadow-2xl border
                    flex flex-col"
                >
                    {/* Header */}

                    <div
                        className="bg-blue-600 text-white
                        px-4 py-3 rounded-t-xl
                        flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-bold">
                                E-Shop Assistant
                            </h2>

                            <p className="text-xs text-blue-100">
                                Ask me about our products
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}

                    <div
                        className="flex-1 overflow-y-auto
                        p-3 space-y-3"
                    >
                        {messages.length === 0 && (
                            <div
                                className="bg-gray-100
                                rounded-lg p-3 text-sm"
                            >
                                👋 Hi! How can I help you?

                                <div className="mt-3 text-gray-600">
                                    Try asking:
                                </div>

                                <div className="mt-1 text-gray-600">
                                    • iPhone ki price kya hai?
                                    <br />
                                    • Kaunsa product available hai?
                                    <br />
                                    • Discount wale products batao
                                </div>
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? "flex justify-end"
                                        : "flex justify-start"
                                }
                            >
                                <div
                                    className={
                                        msg.sender === "user"
                                            ? "bg-blue-600 text-white px-3 py-2 rounded-lg max-w-[80%]"
                                            : "bg-gray-200 text-gray-800 px-3 py-2 rounded-lg max-w-[80%]"
                                    }
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div
                                    className="bg-gray-200
                                    px-3 py-2 rounded-lg"
                                >
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}

                    <div
                        className="border-t p-3
                        flex gap-2"
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask about products..."
                            className="flex-1
                            border rounded-lg
                            px-3 py-2
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-blue-600
                            hover:bg-blue-700
                            disabled:opacity-50
                            text-white
                            px-4 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;