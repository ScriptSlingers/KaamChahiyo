import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const res = await signIn("credentials", {
      ...values,
      callbackUrl: router.query.callbackUrl,
    });
  }

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  return (
    <>
      <div className="flex justify-center items-center my-36">
        <div className="flex flex-col w-1/4 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <p className=" font-bold text-4xl text-center "> Login</p>
                <p className=" text-gray-400 text-center text-md ">
                  Enter your detail to login to your account
                </p>
              </div>
              <div className="flex flex-col gap-3 ">
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Email
                  </label>
                  <input
                    {...register("username")}
                    type="email"
                    placeholder="Email"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-9 py-4 border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline"
                >
                  {isSubmitting ? <>Signing In</> : <>Sign In</>}
                </button>
              </div>
            </div>
          </form>
          <div>
            <p className="font-medium text-sm text-[#9A9A9A] text-center ">
              --- Or login with ---
            </p>

            <div className="flex gap-6 flex-col w-full">
              <button
                onClick={() => signIn("facebook")}
                className="border border-gray-200 rounded-md flex gap-6 px-6 py-3 w-full items-center"
              >
                <div className="w-6 relative">
                  <Image
                    alt=""
                    src="/assets/img/FacebookIcon.svg"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  Continue with Facebook
                </div>
              </button>
              <button
                onClick={() => signIn("google")}
                className="border border-gray-200 rounded-md flex gap-6 px-6 py-3 w-full items-center"
              >
                <div className="w-6 relative">
                  <Image
                    alt=""
                    src="/assets/img/GoogleIcon.svg"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  Continue with Google
                </div>
              </button>
              <div>
                <p className="text-center ">Don&apos;t have account ?</p>

                <p className="text-blue-600 font-bold text-sm text-center">
                  <Link passHref href="/signup">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
