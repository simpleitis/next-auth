import { hashPassword } from "@/lib/auth";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (validateEmail(email) && password.trim() !== "") {
      const exists = await User.findOne({ email });
      if (!exists) {
        const hashedPassword = await hashPassword(password);
        const newUser = {
          email,
          password: String(hashedPassword),
        };

        try {
          await connectMongoDB();
          await User.create(newUser).then((data) =>
            res.status(201).json({ data })
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        return res.status(422).json({ message: "User exists" });
      }
    } else {
      return res.status(422).json({ message: "Invalid input" });
    }
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }
}
