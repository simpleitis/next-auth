import { getSession } from "next-auth/react";
import React from "react";

export default function ContactPage() {
  // CLIENT SIDE AUTH CHECK
  //   const { data: session, status } = useSession();
  //   const router = useRouter();
  //   if (status === "loading") {
  //     return <p>Loading</p>;
  //   } else if (status === "unauthenticated") {
  //     router.push("/");
  //   } else if (status === "authenticated") {
  //     return <div>ContactPage</div>;
  //   }

  return <p>ContactPage</p>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
