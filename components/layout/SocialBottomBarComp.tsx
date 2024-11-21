import { sidebarLinks } from "@/constants/index.mjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditProfileModal from "../Modals/EditProfileModal";
import SearchProfileModal from "../Modals/SearchProfileModal";
// import SocialSearchBar from "/SocialSearchBar"; // Import your search bar component
import SocialSearchBar from "./SocialSearchBar";
import { NotificationsModal } from "../Modals/NotificationsModal";
import { UserButton } from "@clerk/nextjs";
import { NotificationProvider } from "@/contexts/NotificatonContext";

interface SocialBottomBarCompProps {
    onSearchChange: (searchTerm: string) => void;
}
const SocialBottomBarComp: React.FC<SocialBottomBarCompProps> = ({ onSearchChange }) => {
    const pathname = usePathname();
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isSearchProfileModalOpen, setIsSearchProfileModalOpen] = useState(false);
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [profiles, setProfiles] = useState<Array<any>>([]); // Replace `any` with your actual profile type

    const toggleEditProfileModal = () => setIsEditProfileModalOpen(!isEditProfileModalOpen);
    const toggleSearchProfileModal = () => setIsSearchProfileModalOpen(!isSearchProfileModalOpen);
    const toggleNotificationsModal = () => setIsNotificationsModalOpen(!isNotificationsModalOpen);

    // Fetch profile data
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch("/api/profiles"); // Replace with your actual API endpoint
                const data = await response.json();
                setProfiles(data); // Assuming data is an array of profiles
            } catch (error) {
                console.error("Failed to fetch profiles:", error);
            }
        };

        fetchProfiles();
    }, []);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term); // Update search term for local filtering
        onSearchChange(term); // Pass updated search term to parent
    };

    return (
        <NotificationProvider>
            <div className="z-50 sticky flex bottom-0 w-full bg-black px-6 py-3 items-center justify-between md:hidden">
                {sidebarLinks.map((link) => {
                    let isActive = false;

                    if (link.label === "Manage" && isEditProfileModalOpen) {
                        isActive = true;
                    } else if (link.label === "Search" && isSearchProfileModalOpen) {
                        isActive = true;
                    } else if (!isEditProfileModalOpen && !isSearchProfileModalOpen && pathname === link.route) {
                        isActive = true;
                    }

                    if (link.label === "Search") {
                        return (
                            <div
                                key={link.label}
                                onClick={toggleSearchProfileModal}
                                className={`flex gap-2 items-center rounded-lg py-2 px-4 cursor-pointer ${isActive ? "bg-blue-500" : ""}`}
                            >
                                {link.icon} <p className="text-sm font-medium text-gray-200 max-sm:hidden">{link.label}</p>
                            </div>
                        );
                    }

                    if (link.label === "Manage") {
                        return (
                            <div
                                key={link.label}
                                onClick={toggleEditProfileModal}
                                className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive ? "bg-blue-500" : ""}`}
                                role="button"
                                tabIndex={0}
                            >
                                {link.icon} <p className="text-sm font-medium text-gray-200 max-sm:hidden">{link.label}</p>
                            </div>
                        );
                    }

                    if (link.label === "Notifications") {
                        return (
                            <div
                                key={link.label}
                                onClick={toggleNotificationsModal}
                                className={`flex gap-2 items-center rounded-lg py-2 px-4 cursor-pointer ${isNotificationsModalOpen ? "bg-blue-500" : ""}`}
                            >
                                {link.icon} <p className="text-sm font-medium text-gray-200 max-sm:hidden">{link.label}</p>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={link.label}
                            href={link.route}
                            passHref
                            title={link.description}
                            className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive ? "bg-blue-500" : ""}`}
                        >
                            {link.icon} <p className=" text-sm font-medium text-gray-200 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
                        </Link>
                    );
                })}
                <EditProfileModal isOpen={isEditProfileModalOpen} onClose={toggleEditProfileModal} />
                <SearchProfileModal
                    isOpen={isSearchProfileModalOpen}
                    onClose={toggleSearchProfileModal}
                    data={profiles} // Pass dynamic profile data
                    searchTerm={searchTerm} // Pass search term
                    onSearchChange={handleSearchChange} // Handle search input
                />
                <NotificationsModal isOpen={isNotificationsModalOpen} onClose={toggleNotificationsModal} />
                <UserButton />
            </div>
            {isSearchProfileModalOpen && (
                <div className="absolute top-0 left-0 w-full px-4 py-2">
                    <SocialSearchBar onSearchChange={handleSearchChange} /> {/* Embed the search bar */}
                </div>
            )}
        </NotificationProvider>
    );
};

export default SocialBottomBarComp;


// import { sidebarLinks } from "@/constants/index.mjs";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import EditProfileModal from "../Modals/EditProfileModal";
// import SearchProfileModal from "../Modals/SearchProfileModal";
// import { NotificationsModal } from "../Modals/NotificationsModal";
// import { UserButton } from "@clerk/nextjs";
// import { NotificationProvider } from "@/contexts/NotificatonContext";

// interface SocialBottomBarCompProps {
//     onSearchChange: (searchTerm: string) => void;
// }

// const SocialBottomBarComp: React.FC<SocialBottomBarCompProps> = ({ onSearchChange }) => {
//     const pathname = usePathname();
//     const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
//     const [isSearchProfileModalOpen, setIsSearchProfileModalOpen] = useState(false);
//     const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

//     const toggleEditProfileModal = () => setIsEditProfileModalOpen(!isEditProfileModalOpen);
//     const toggleSearchProfileModal = () => setIsSearchProfileModalOpen(!isSearchProfileModalOpen);
//     const toggleNotificationsModal = () => setIsNotificationsModalOpen(!isNotificationsModalOpen);

//     return (
  
//         <NotificationProvider>
//             <div className="z-50 sticky flex bottom-0 w-full bg-black px-6 py-3 items-center justify-between md:hidden">
//                 {sidebarLinks.map((link) => {
//                     let isActive = false; // Default to false

//                     // Special handling based on modals
//                     if (link.label === "Manage" && isEditProfileModalOpen) {
//                         isActive = true;
//                     } else if (link.label === "Search" && isSearchProfileModalOpen) {
//                         isActive = true;
//                     } 
//                     else if (!isEditProfileModalOpen && !isSearchProfileModalOpen && pathname === link.route) {
//                         // If no modals are open and the route matches, then it's active
//                         isActive = true;
//                     }

//                     if (link.label === "Search") {
//                         return (
//                             <div key={link.label} onClick={toggleSearchProfileModal} className={`flex gap-2 items-center rounded-lg py-2 px-4 cursor-pointer ${isActive ? "bg-blue-500" : ""}`}>
//                                 {link.icon} <p className="text-sm font-medium text-gray-200 max-sm:hidden">{link.label}</p>
//                             </div>
//                         );
//                     }

//                     if (link.label === "Manage") {
//                         return (
//                             <div key={link.label} onClick={toggleEditProfileModal} className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive ? "bg-blue-500" : ""}`} role="button" tabIndex={0}>
//                                 {link.icon} <p className="text-sm font-medium text-gray-200 max-sm:hidden">{link.label}</p>
//                             </div>
//                         );
//                     }

//                     if (link.label === "Notifications") {
//                         return (
//                             <div key={link.label} onClick={toggleNotificationsModal} className={`flex gap-2 items-center rounded-lg py-2 px-4 cursor-pointer ${isNotificationsModalOpen ? "bg-blue-500" : ""}`}>
//                                 {link.icon} <p className="text-sm font-medium text-gray-200 max-sm:hidden">{link.label}</p>
//                             </div>
//                         );
//                     }


//                     // Other links
//                     return (
//                         <Link key={link.label} href={link.route} passHref title={link.description} className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive ? "bg-blue-500" : ""}`}>
//                             {link.icon} <p className=" text-sm font-medium text-gray-200 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
//                         </Link>
//                     );
//                 })}
//                 <EditProfileModal isOpen={isEditProfileModalOpen} onClose={toggleEditProfileModal} />
//                 <SearchProfileModal isOpen={isSearchProfileModalOpen} onClose={toggleSearchProfileModal} onSearchChange={onSearchChange} />
//                 <NotificationsModal isOpen={isNotificationsModalOpen} onClose={toggleNotificationsModal} />
//                 <UserButton />
//             </div>
//             </NotificationProvider>
//     );
// };

// export default SocialBottomBarComp;
