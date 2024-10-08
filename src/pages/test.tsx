import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace(`/login`);
    } else {
      const userId = session.user["id"];
      // console.log("userId : " + userId);
      setId(userId);
    }
  }, [session, router]);
  const [id, setId] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const [typeCurrentPassword, setTypeCurrentPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({});

  // const verifyPassword = getValues("typeCurrentPassword");
  // const newPassword = getValues("newPassword");
  // const confirmPassword = getValues("confirmNewPassword");

  // const [getCurrentPassword, setGetCurrentPassword] = useState("");
  let [postNewPassword, setPostNewPassword] = useState("");
  const getCurrentPassword = async () => {
    return await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        return data?.user?.password;
      });
  };

  const currentPassword = getCurrentPassword();

  // useEffect(() => {
  //   fetch(`/api/users/${id}`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGetCurrentPassword(data?.user?.password);
  //       console.log("data  1:", data);
  //     });
  // }, []);

  async function onSubmit(data) {
    // try {
    //   console.log("get password:", getCurrentPassword);
    //   if (getCurrentPassword === SHA256(typeCurrentPassword).toString()) {
    //     if (newPassword === confirmNewPassword) {
    //       {
    //         // setPostNewPassword(SHA256(confirmNewPassword).toString());
    //         // console.log("data 2: ", data);
    //         await fetch(`/api/users/${id}`, {
    //           method: "PUT",
    //           headers: {
    //             "Content-Type": "application/json",
    //             accept: "application/json",
    //           },
    //           body: JSON.stringify({
    //             password: SHA256(confirmNewPassword).toString(),
    //           }),
    //         });
    //         console.log(
    //           "Password Verified sucessfully, please enter new password"
    //         );
    //       }
    //     } else {
    //       console.log("input password not match");
    //     }
    //   } else {
    //     console.log("Password is incorrect");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div className="flex justify-center ">
      <h1>{id}</h1>

      <h1>{JSON.stringify(currentPassword)}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl h-[672px]"
      >
        <div className="flex flex-col gap-3">
          <p className="font-bold text-4xl text-center p-4">
            Change your password
          </p>
        </div>

        <div className="flex flex-col gap-1 text-gray-500">
          <label>Current Password:</label>
          <input
            type="password"
            placeholder="Enter current Password"
            className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
            {...register("typeCurrentPassword")}
          />
          {errors.typeCurrentPassword && (
            <p className="text-red-500">Current password is required</p>
          )}
          {errors.typeCurrentPassword && (
            <p className="text-red-500">Password is incorrect</p>
          )}
        </div>

        <div className="flex flex-col gap-1 text-gray-500">
          <label>New password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            // {...register("newPassword")}
            // placeholder="Type new password"
            className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
          />
          {/* {errors.newPassword && (
            <p className="text-red-500">New password is required</p>
          )} */}
        </div>

        <div className="flex flex-col gap-1 text-gray-500">
          <label>Confirm new password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            // {...register("confirmNewPassword")}
            placeholder="Confirm new password"
            className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
          />
          {/* <input
            type="hidden"
            value={confirmNewPassword}
            {...register("confirmNewPassword")}
          /> */}
        </div>
        <div className="flex gap-5 flex-col">
          <div className=" hover:cursor-text">
            <Link passHref href="/forget-password">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="px-5 py-4 border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-lg text-white text-xl font-bold w-1/3 focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? <>Updating</> : <>Update</>}
          </button>
          {/* <Link passHref href="#">
            <Button value="Update"></Button>
          </Link> */}
        </div>
      </form>
    </div>
  );
}
