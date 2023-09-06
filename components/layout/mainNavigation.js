import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function MainNavigation() {
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className="flex justify-between items-center px-5 bg-lime-300">
      <Link href="/">
        <Image src="/vercel.svg" alt="logo" width={200} height={200} />
      </Link>
      <nav>
        <ul className="flex gap-x-5 p-10">
          <li>
            <Link href="/passwordChange">Change password</Link>
          </li>
          {session && (
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
