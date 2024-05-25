-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT,
    "departmentId" TEXT,
    "departmentName" TEXT,
    "Status" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'Employee',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "Project_Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Department_Id" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("id")
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
    "Monday" INTEGER,
    "Tuesday" INTEGER,
    "Wednesday" INTEGER,
    "Thursday" INTEGER,
    "Friday" INTEGER,
    "Total_hours" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "Approval_Status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskPerformed" TEXT NOT NULL,
    "taskStatus" TEXT NOT NULL,
    "tableRowId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableDetails" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "weeklyPeriod" TEXT NOT NULL,
    "projectManager" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "Approval_Status" TEXT NOT NULL,

    CONSTRAINT "TableDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableRow" (
    "id" TEXT NOT NULL,
    "weekday" TEXT NOT NULL,
    "totalHours" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tableDetailsId" TEXT NOT NULL,

    CONSTRAINT "TableRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Project_Name_key" ON "Project"("Project_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_Department_Name_key" ON "Department"("Department_Name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_Department_Id_fkey" FOREIGN KEY ("Department_Id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_tableRowId_fkey" FOREIGN KEY ("tableRowId") REFERENCES "TableRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableRow" ADD CONSTRAINT "TableRow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableRow" ADD CONSTRAINT "TableRow_tableDetailsId_fkey" FOREIGN KEY ("tableDetailsId") REFERENCES "TableDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
