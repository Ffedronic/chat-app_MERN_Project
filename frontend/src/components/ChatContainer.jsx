import React from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

/**
 * This function renders the chat container
 * @returns The ChatContainer component is returning a section element with three children. The first
 * child is an article element with an id of "chatContainer-header". The second child is an article
 * element with an id of "chatContainer-messages". The third child is an article element with an id of
 * "chatContainer-input".
 */
function ChatContainer() {
  
  const handleSendMessage = () => {}
  
  return (
    <section className="p-2 d-flex flex-column justify-content-between w-100 h-100">
      <ChatHeader/>
      <article id="chatContainer-messages"></article>
      <ChatInput handleSendMessage={ handleSendMessage } />
    </section>
  );
}

export default ChatContainer;
