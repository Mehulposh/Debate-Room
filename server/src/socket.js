export function setupSocket(io) {
  //storing active debates
  const activeDebates = new Map();

  //socket connection
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    //joining debate
    socket.on("join-debate", (debateId) => {
      socket.join(debateId);

      if (!activeDebates.has(debateId)) {
        activeDebates.set(debateId, {
          participants: new Set(),
          currentSpeaker: null,
          timerStart: null
        });
      }

      activeDebates.get(debateId).participants.add(socket.id);
      io.to(debateId).emit("participant-joined", { socketId: socket.id });
    });

    //leaving debate
    socket.on("leave-debate", (debateId) => {
      socket.leave(debateId);

      if (activeDebates.has(debateId)) {
        activeDebates.get(debateId).participants.delete(socket.id);
        io.to(debateId).emit("participant-left", { socketId: socket.id });
      }
    });

    //starting timer
    socket.on("start-timer", ({ debateId, userId, username }) => {
      const debate = activeDebates.get(debateId);
      if (!debate) return;

      debate.currentSpeaker = { userId, username };
      debate.timerStart = Date.now();

      io.to(debateId).emit("timer-started", {
        userId,
        username,
        timestamp: debate.timerStart
      });
    });

    //stoping timer
    socket.on("stop-timer", ({ debateId, userId }) => {
      const debate = activeDebates.get(debateId);
      if (!debate || !debate.timerStart) return;

      const duration = Date.now() - debate.timerStart;

      const timeSegment = {
        start: new Date(debate.timerStart),
        end: new Date(),
        duration
      };

      debate.currentSpeaker = null;
      debate.timerStart = null;

      io.to(debateId).emit("timer-stopped", {
        userId,
        duration,
        timeSegment
      });
    });

    //sending new argument
    socket.on("new-argument", ({ debateId, argument }) => {
      io.to(debateId).emit("argument-added", argument);
    });

    //update argument position
    socket.on(
      "update-argument-position",
      ({ debateId, argumentId, position }) => {
        io.to(debateId).emit("argument-position-updated", {
          argumentId,
          position
        });
      }
    );

    //change the debate status
    socket.on("debate-status-change", ({ debateId, status }) => {
      io.to(debateId).emit("status-changed", status);
    });

    //disconnecting the socket
    socket.on("disconnect", () => {
      activeDebates.forEach((debate, debateId) => {
        if (debate.participants.has(socket.id)) {
          debate.participants.delete(socket.id);
          io.to(debateId).emit("participant-left", {
            socketId: socket.id
          });
        }
      });
    });
  });
}
