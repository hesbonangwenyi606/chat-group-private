import express from "express";
import cors from "cors";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { initTRPC } from "@trpc/server";
import http from "http";
import { Server } from "socket.io";

// ---------------- tRPC ----------------
const t = initTRPC.create();

const appRouter = t.router({
  getChannels: t.procedure.query(() => {
    return [
      { id: "1", name: "general", is_private: false, unread_count: 2 },
      { id: "2", name: "random", is_private: false, unread_count: 0 },
    ];
  }),
  createChannel: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      console.log("Create channel:", input.name);
      return { id: Date.now().toString(), name: input.name, is_private: false, unread_count: 0 };
    }),
});

// ---------------- Express ----------------
const app = express();
app.use(cors());
app.use(express.json());

// tRPC endpoint
app.use("/trpc", createHTTPHandler({ router: appRouter }));

// ---------------- Socket.io ----------------
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (msg) => {
    io.emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ---------------- Start Server ----------------
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ---------------- Types ----------------
export type AppRouter = typeof appRouter;
