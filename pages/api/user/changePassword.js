// import { authOptions } from "../auth/[...nextauth]";
// import { getServerSession } from "next-auth";

// import { hashPassword, verifyPassword } from "@/lib/auth";
// import User from "@/models/user";
// import connectMongoDB from "@/lib/mongodb";

// async function handler(req, res) {
//   if (req.method !== "PATCH") {
//     return;
//   }

//   const session = await getServerSession(req, res, authOptions);

//   console.log("Session", session);

//   if (!session) {
//     res.status(401).json({ message: "Not authenticated!" });
//     return;
//   }

//   const userEmail = session.user.email;
//   const oldPassword = req.body.oldPassword;
//   const newPassword = req.body.newPassword;

//   await connectMongoDB();

//   const user = await User.findOne({ email: userEmail });

//   if (!user) {
//     res.status(404).json({ message: "User not found." });
//     client.close();
//     return;
//   }

//   const currentPassword = user.password;

//   const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

//   if (!passwordsAreEqual) {
//     res.status(403).json({ message: "Invalid password." });
//     client.close();
//     return;
//   }

//   const hashedPassword = await hashPassword("newPassword");

//   const result = await User.updateOne(
//     { email: userEmail },
//     { password: hashedPassword }
//   );

//   res.status(200).json({ message: "Password updated!" });
// }

// export default handler;

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { hashPassword, verifyPassword } from "@/lib/auth";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  console.log(session);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  await connectMongoDB();

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await User.updateOne(
    { email: userEmail },
    { password: hashedPassword }
  );

  res.status(200).json({ message: "Password updated!" });
}

export default handler;
