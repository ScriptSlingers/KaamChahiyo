import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../components/TabSelector";
import { HomeIcon } from "../icons";


export default function Profile() {
    const [selectedTab, setSelectedTab] = useTabs([
        "profile-tab",
        "security-tab",
    ]);
    const { data: session } = useSession();
    const router = useRouter();
    if (typeof window === "undefined") return null;
    if (!session) {
        router.replace("/login")
    }
    else {
        // const [userEmail, setUserEmail] = useState(session.user.email);
        // const emailChange = (e) => { setUserEmail(e.target.value) };

        // const [userName, setUserName] = useState(session.user.name);
        // const nameChange = (e) => { setUserName(e.target.value) };

        // const [userPassword, setUserPassword] = useState(session.user.password);
        // const passwordChange = (e) => { setUserPassword(e.target.value) };


        return (
            <>
                <div className=" container mt-20 flex flex-col gap-12 z-10">
                    <div className="container flex lg:flex-row flex-col-reverse">
                        <div className="flex flex-row lg:flex-col w-1/4 gap-3 m-10">
                            <TabSelector
                                isActive={selectedTab === "profile-tab"}
                                onClick={() => setSelectedTab("profile-tab")}
                            >
                                <div className='hidden lg:flex bg-orange-100 justify-center items-center p-3 w-14 h-14 text-red rounded-full'>
                                    <div className=" w-6 text-orange-400">
                                        {HomeIcon}
                                    </div>
                                </div>
                                <div className='font-medium text-lg lg:text-2xl text-gray-600 flex items-center'>
                                    Profile
                                </div>
                            </TabSelector>
                            <TabSelector
                                isActive={selectedTab === "security-tab"}
                                onClick={() => setSelectedTab("security-tab")}
                            >
                                <div className=' hidden lg:flex bg-orange-100 justify-center items-center p-3 w-14 h-14   text-red   rounded-full'>
                                    <div className=" w-6 text-orange-400">
                                        {HomeIcon}
                                    </div>
                                </div>
                                <div className='font-medium text-lg lg:text-2xl text-gray-600 flex items-center'>
                                    Security
                                </div>
                            </TabSelector>

                        </div>
                        <div className="w-3/4 ">
                            <TabPanel hidden={selectedTab !== "profile-tab"}>
                                <div className='flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl '>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-bold text-4xl text-center p-4">Update your profile</p>
                                    </div>
                                    {/* <div className='flex flex-col'>
                                        <div className=''>
                                            <Image src={session?.user?.image} alt={session?.user?.name} width={100} height={100} quality={100} />
                                        </div>
                                        <div>{session.user.name}</div>
                                    </div> */}
                                    {/* <div className='flex flex-col gap-1 text-gray-500'>
                                        <label className='text-grey'>Name:</label>
                                        <input type="text" placeholder="Name" value={userName} onChange={nameChange}
                                            className='border-2 focus:outline-none focus:shadow-outline border-gray-300 p-3 rounded-md'
                                        />

                                    </div> */}
                                    {/* <div className='flex flex-col gap-1 text-gray-500'>
                                        <label>Email:</label>
                                        <input type="text" placeholder="email" value={userEmail} onChange={emailChange}
                                            className='border-2 focus:outline-none focus:shadow-outline border-gray-300 p-3 rounded-md'
                                        />
                                    </div> */}
                                    {/* <div className='flex flex-col gap-1 text-gray-500'>
                                        <label>Bio:</label>
                                        <textarea rows={3} value={userBio} onChange={bioChange}
                                            className='border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md'
                                        />
                                    </div> */}
                                    <Link href="">
                                        <div>
                                            <button className="px-5 py-4 bg-teal-900 hover:bg-teal-700 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline">Update</button>
                                        </div>
                                    </Link>
                                </div>
                            </TabPanel>
                            <TabPanel hidden={selectedTab !== "security-tab"}>
                                <div className='flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl h-[813px]'>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-bold text-4xl text-center p-4">Update your Security</p>
                                    </div>

                                    <div className='flex flex-col gap-1 text-gray-500'>
                                        <label>Password:</label>
                                        <input type="password" placeholder="password" value=""
                                            className='border-2 focus:outline-none border-gray-300 p-3 rounded-md'
                                        />
                                    </div>
                                    <Link href="">
                                        <div>
                                            <button className="px-5 py-4 bg-teal-900 hover:bg-teal-700 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline">Update</button>
                                        </div>
                                    </Link>
                                </div>
                            </TabPanel>
                        </div>

                    </ div>
                </div >
            </>
        );
    };
}
