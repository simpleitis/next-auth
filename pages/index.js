import React, { useRef } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const email = useRef();
  const password = useRef();

  const loginHandler = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email.current.value,
      password: password.current.value,
    });

    if(!result.error) {
      // set auth state
    }
    console.log(result);
    //  const response = await axios.post("/api/contact", requestBody);
  };

  return (
    <section>
      <h1>How can I help you?</h1>
      <form onSubmit={loginHandler}>
        <div>
          <div>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              className="border mt-2"
              ref={email}
            />
          </div>
          <div>
            <label htmlFor="name">Your password</label>
            <input
              type="text"
              id="name"
              required
              className="border mt-2"
              ref={password}
            />
          </div>
        </div>

        <div>
          <button className="p-3 border mt-2">Send Message</button>
        </div>
      </form>
    </section>
  );
}
