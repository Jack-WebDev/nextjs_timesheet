-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT,
    "Department" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'Employee',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "Project_Name" TEXT NOT NULL,
    "Department_Id" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "Department_Name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timesheet" (
    "id" TEXT NOT NULL,
    "Full_Name" TEXT NOT NULL,
    "Project_Name" TEXT NOT NULL,
    "Task_performed" TEXT,
    "Week" TEXT NOT NULL,
    "Monday" TEXT,
    "Tuesday" TEXT,
    "Wednesday" TEXT,
    "Thursday" TEXT,
    "Friday" TEXT,
    "Total_hours" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "Approval_Status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Project_Name_key" ON "Project"("Project_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_Department_Name_key" ON "Department"("Department_Name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_Department_Id_fkey" FOREIGN KEY ("Department_Id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
