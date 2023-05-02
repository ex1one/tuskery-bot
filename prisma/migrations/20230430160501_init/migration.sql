-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
