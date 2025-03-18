# Real-Time Multi-Room Chat Application

A real-time, multi-room chat application built with WebSockets. The application supports room-based messaging, user-specific views, and provides a clean and intuitive user interface for seamless communication.

## Features

- **Room-Based Messaging**: Create and join specific chat rooms to organize conversations.
- **Real-Time Communication**: Instant messaging powered by WebSockets.
- **User-Specific Views**:
  - Messages sent by the user are highlighted in **green**.
  - Messages received are displayed in **white**.
- **Timestamps and Usernames**: Each message includes the sender’s username and the exact time it was sent.
- **Auto-Scroll**: Automatically scrolls to the newest message when a new one appears in the chat.

## Demo
- [Click Here & Watch Project Demo Video](https://drive.google.com/file/d/1Gc3GvJUgjVIW5dJpPNHysxk0dQ-Y61aa/view?usp=drive_link)


## Technologies Used

- **Frontend**:
  - React, Tailwind CSS, Typescript
  - WebSockets for real-time updates

- **Backend**:
  - Node.js with WebSocket library (e.g., `ws` or `Socket.IO`)


## Installation

Follow these steps to set up the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/nishikant23/chatroom_v1.git
   cd chatroom_v1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Frontend and Backend server both by using:
   ```bash
   npm run dev 
   ```

4. Open your browser and navigate to :
   ```
   http://localhost:5173
   ```
5. Your backend will be running on 8080 port :
   ```
   http://localhost:8080
   ```
   
## How It Works

1. **Joining a Room**:
   - Users can join an existing room or create a new one by entering a room name.
   - Each user has a unique username displayed alongside their messages.
   - Each user can see the room name he/she joined & his/her username on Chat room page's Navbar 
 
2. **Sending Messages**:
   - Messages sent by the user are highlighted in green.
   - Messages from other users in the room are displayed in white.

3. **Real-Time Updates**:
   - WebSocket connections ensure that messages are instantly delivered to all users in the room.

4. **Auto-Scroll**:
   - The chat window automatically scrolls to display the latest message.

## Future Enhancements

- **User Authentication**: Secure user accounts with login and registration.
- **Message Persistence**: Store chat history in a database for future retrieval.
- **Typing Indicators**: Show when users are typing in a chat room.
- **File Sharing**: Allow users to send images or documents in the chat.
- **Mobile Responsiveness**: Optimize the UI for mobile devices.

## Contributing

Contributions are welcome! If you’d like to help improve this project, please:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: nishikantdounekar23@gmail.com
- **GitHub**: [nishikant23](https://github.com/nishikant23)

---

Thank you for checking out this project! Happy coding!
