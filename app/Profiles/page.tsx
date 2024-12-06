// "use client"
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import SocialRightSideComp from '@/components/layout/SocialRightSideComp';
// import { useUser } from '@clerk/nextjs'
// import { interestsOptions } from '@/constants/InterestOptions';
// import SocialBottomBarComp from '@/components/layout/SocialBottomBarComp';
// import { NotificationProvider } from '@/contexts/NotificatonContext';

// interface Profile {

//   name: string;
//   email: string;
//   role: string;
//   imageUrl: string;
//   lastSeen?: string;
//   lastSeenDateTime?: string;
//   isOnline: boolean;
//   interests: string[];
//   introduction?: string; // New
//   backgroundImageUrl?: string; // New - Background image for profile
//   school?: string; // Added field for school
//   major?: string;  // Added field for major
//   gender: string;

// }

// const Profiles: React.FC = () => {



//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [filterOnlineStatus, setFilterOnlineStatus] = useState<boolean | null>(null);
//   const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // state to manage the visibility of the modal for selectable interest 
//   const [isDropdownOpen, setIsDropdownOpen,] = useState(false);
//   const [isDropdownStatusOpen, setIsDropdownStatusOpen,] = useState(false);
//   const [currentStatus, setCurrentStatus] = useState('Filter by Roommate Ready');
//   const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // state to manage the visibi````lity of the modal for selectable interest 
//   const [filterGender, setFilterGender] = useState<string | null>(null); // null indicates no filter
//   const [isDropdownGenderOpen, setIsDropdownGenderOpen] = useState(false);
// // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
// const [windowWidth, setWindowWidth] = useState(0); // Initialize to 0 or a sensible default width
//   // Add a state for managing the search term
//   const [searchTerm, setSearchTerm] = useState('');

// // Function to truncate text
// const truncateText = (text: string) => {
//   // Adjust 1024 according to your 'lg' breakpoint
//   if (windowWidth <= 1024 && text.length > 3) {
//     return text.substring(0, 6) + '...';
//   }
//   return text;
// };
//   //TEST!
//   useEffect(() => {
//     try {
//       const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
//       setProfiles(storedProfiles);
//       console.log("Profiles loaded from storage:", storedProfiles);
//     } catch (error) {
//       console.error("Failed to parse profiles from localStorage", error);
//     }
//   }, []);
//   //Original  
//   // useEffect(() => {
//   //   const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
//   //   setProfiles(storedProfiles);
//   //   console.log("Profiles loaded from storage:", storedProfiles); // This logs the profiles as they are initially loaded from storage TEST!
//   // }, []);


//   useEffect(() => {
//     // Correctly set windowWidth after component mounts
//     setWindowWidth(window.innerWidth);

//     // Define a function to handle subsequent resize events
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     // Add event listener for resize
//     window.addEventListener('resize', handleResize);

//     // Cleanup function to remove the event listener
//     return () => window.removeEventListener('resize', handleResize);
//   }, []); // Empty dependency array means this effect runs once on mount



//   useEffect(() => {
//     const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
//     setProfiles(storedProfiles);

//   }, []);

//   const { isLoaded, isSignedIn } = useUser();

//   if (!isLoaded || !isSignedIn) {
//     return null;
//   }

// // Function to update search term
// const handleSearchChange = (searchTerm: string) => {
//   setSearchTerm(searchTerm);
// };

//   const handleOnlineStatusChange = (status: boolean | null, label: string) => {
//     setFilterOnlineStatus(status); // This sets the actual filter status (true for online, false for offline, null for all)
//     setCurrentStatus(label); // This changes the button label to reflect the current filter
//     setIsDropdownStatusOpen(false); // Close the dropdown after a selection is made
//   };

//   // Filter function adjustment for search bar 
//   const filteredProfiles = profiles.filter((profile) => {
//     const lowerSearchTerm = searchTerm.toLowerCase();

//     const matchesOnlineStatus = filterOnlineStatus !== null ? profile.isOnline === filterOnlineStatus : true;
//     const matchesInterests = selectedInterests.length > 0 ? selectedInterests.every((interest) => profile.interests.includes(interest)) : true;
//     const matchesGender = filterGender ? profile.gender === filterGender : true;

//     const matchesSearchTerm =
//       profile.name.toLowerCase().includes(lowerSearchTerm) ||
//       profile.email.toLowerCase().includes(lowerSearchTerm) ||
//       profile.role.toLowerCase().includes(lowerSearchTerm) ||
//       profile.gender.toLowerCase().includes(lowerSearchTerm) ||
//       (profile.major && profile.major.toLowerCase().includes(lowerSearchTerm)) ||
//       (profile.school && profile.school.toLowerCase().includes(lowerSearchTerm)) || // Add school filtering
//       profile.interests.some((interest) => interest.toLowerCase().includes(lowerSearchTerm));

//     return matchesOnlineStatus && matchesInterests && matchesGender && matchesSearchTerm;
//   });

// // UI for selecting interest
// const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>, interest: string) => {
//   const checked = event.target.checked;
//   setSelectedInterests(prev => {
//     if (checked) {
//       // Add interest if it's not already included and prevent duplicates
//       return prev.includes(interest) ? prev : [...prev, interest];
//     } else {
//       // Remove interest if it's already included
//       return prev.filter(i => i !== interest);
//     }
//   });
// };

// const handleProfileClick = (profile: Profile) => {
//   setSelectedProfile(profile);
//   // You might also want to toggle the visibility of the modal here if it's not solely based on whether selectedProfile is null
//   setIsProfileModalOpen(true); // Assuming this is the modal state you mentioned
// };

// const handleGenderChange = (gender: string | null) => {
//   setFilterGender(gender); // Set the selected gender filter
//   setIsDropdownGenderOpen(false); // Close the dropdown
// };



// // Function to toggle the modal's
// const toggleProfileModal = () => {
//   setIsProfileModalOpen(!isProfileModalOpen);

// }
// const toggleModal = () => {
//   setIsModalOpen(!isModalOpen);

// };
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SocialRightSideComp from "@/components/layout/SocialRightSideComp";
import { useUser } from "@clerk/nextjs";
import { interestsOptions } from "@/constants/InterestOptions";
import SocialBottomBarComp from "@/components/layout/SocialBottomBarComp";
import { NotificationProvider } from "@/contexts/NotificatonContext";

interface Profile {
  name: string;
  email: string;
  role: string;
  imageUrl: string;
  lastSeen?: string;
  lastSeenDateTime?: string;
  isOnline: boolean;
  interests: string[];
  introduction?: string;
  backgroundImageUrl?: string;
  school?: string;
  major?: string;
  gender: string;
}

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [filterOnlineStatus, setFilterOnlineStatus] = useState<boolean | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownStatusOpen, setIsDropdownStatusOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Filter by Roommate Ready");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [filterGender, setFilterGender] = useState<string | null>(null);
  const [isDropdownGenderOpen, setIsDropdownGenderOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(0); // Initialize to 0 or a sensible default width
  const { isLoaded, isSignedIn } = useUser();

  // Function to fetch profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!isLoaded || !isSignedIn) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GET_USERS_API_ENDPOINT}`); // Replace with your API Gateway URL
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Map API response to Profile interface
        const mappedProfiles = data.map((user: any) => ({
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role || "Intern",
          imageUrl: user.imageUrl || "",
          lastSeen: user.lastSeen || "",
          lastSeenDateTime: user.lastSeenDateTime || "",
          isOnline: user.isOnline || false,
          interests: user.interests || [],
          school: user.school || "",
          major: user.major || "",
          gender: user.gender || "",
        }));
        setProfiles(mappedProfiles);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [isLoaded, isSignedIn]);

  // Function to filter profiles based on search and selected filters
  const filteredProfiles = profiles.filter((profile) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const matchesOnlineStatus = filterOnlineStatus !== null ? profile.isOnline === filterOnlineStatus : true;
    const matchesInterests = selectedInterests.length > 0 ? selectedInterests.every((interest) => profile.interests.includes(interest)) : true;
    const matchesGender = filterGender ? profile.gender === filterGender : true;

    const matchesSearchTerm =
      profile.name.toLowerCase().includes(lowerSearchTerm) ||
      profile.email.toLowerCase().includes(lowerSearchTerm) ||
      profile.role.toLowerCase().includes(lowerSearchTerm) ||
      profile.gender.toLowerCase().includes(lowerSearchTerm) ||
      (profile.major && profile.major.toLowerCase().includes(lowerSearchTerm)) ||
      (profile.school && profile.school.toLowerCase().includes(lowerSearchTerm)) ||
      profile.interests.some((interest) => interest.toLowerCase().includes(lowerSearchTerm));

    return matchesOnlineStatus && matchesInterests && matchesGender && matchesSearchTerm;
  });

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const handleOnlineStatusChange = (status: boolean | null, label: string) => {
    setFilterOnlineStatus(status); // Sets the actual filter status
    setCurrentStatus(label); // Updates the dropdown button text
    setIsDropdownStatusOpen(false); // Closes the dropdown
  };

  // UI for selecting interest
  const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>, interest: string) => {
    const checked = event.target.checked;
    setSelectedInterests(prev => {
      if (checked) {
        // Add interest if it's not already included and prevent duplicates
        return prev.includes(interest) ? prev : [...prev, interest];
      } else {
        // Remove interest if it's already included
        return prev.filter(i => i !== interest);
      }
    });
  };

  // Function to truncate text
  const truncateText = (text: string) => {
    // Adjust 1024 according to your 'lg' breakpoint
    if (windowWidth <= 1024 && text.length > 3) {
      return text.substring(0, 6) + '...';
    }
    return text;
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

  };
  const handleGenderChange = (gender: string | null) => {
    setFilterGender(gender); // Set the selected gender filter
    setIsDropdownGenderOpen(false); // Close the dropdown
  };

  // Function to toggle the modal's
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);

  }
  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
    // You might also want to toggle the visibility of the modal here if it's not solely based on whether selectedProfile is null
    setIsProfileModalOpen(true); // Assuming this is the modal state you mentioned
  };
  // Function to update search term
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <NotificationProvider>

      <div>
        <div className="bg-gray-800 min-h-screen py-8">
          <div className="pt-2 flex justify-between">
            <div className="flex-grow mx-auto w-2xl">

              {/* Filter Controls */}
              <div className=" mb-4 text-black relative flex flex-col sm:items-center lg:inline-block text-left">
                <div className="mb-4 text-black mx-3 relative">
                  <div className="flex flex-wrap justify-center">
                    <div className="inline-block text-left">
                      {/* <!-- Status Button and Dropdown --> */}
                      <div className="relative inline-block text-left ">
                        <button
                          type="button"
                          // inline-flex justify-center w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-2 py-2 sm:px-4 sm:py-2 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          className="inline-flex items-center justify-center px-2 py-2 w-[100px] text-xs bg-white border border-gray-300 
                        rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                        sm:w-auto sm:px-4 sm:py-2 sm:text-sm "
                          onClick={() => setIsDropdownStatusOpen(!isDropdownStatusOpen)}
                        >
                          {/* Text for smaller screens */}
                          <span className="block lg:hidden">Roomie?</span>
                          {/* Text for larger screens */}
                          <span className="hidden lg:block">{currentStatus}</span>
                          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>


                        {isDropdownStatusOpen && (
                          <div className="z-10 origin-top-right absolute right-0 mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {/* Option to clear the selection and show all items */}
                              <button
                                className=" text-gray-700 block px-4 py-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-200 w-full text-left"
                                onClick={() => handleOnlineStatusChange(null, 'Filter by Roommate Ready')}

                              >
                                All
                              </button>
                              <button
                                className="text-gray-700 block px-4 py-2 text-xs sm:text-sm  cursor-pointer hover:bg-gray-200 w-full text-left"
                                onClick={() => handleOnlineStatusChange(true, 'Rommie Ready')}
                              >
                                Yes
                              </button>
                              <button
                                className="text-gray-700 block px-4 py-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-200 w-full text-left"
                                onClick={() => handleOnlineStatusChange(false, 'Not Looking for Roommate')}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mx-3 inline-block text-left">
                      {/* <!-- Interests Button and Dropdown --> */}
                      <div className="relative inline-block text-left ">
                        <div>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-[120px] px-2 py-2 text-xs bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <span className="block lg:hidden">Interests</span>
                            <span className="hidden lg:block">Filter by Interest ({selectedInterests.length})</span>
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>

                        </div>

                        {isDropdownOpen && (
                          <div className="z-10 origin-top-right absolute right-0 mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="py-1" role="none">
                              {interestsOptions.slice(0, 5).map((interest, index) => (
                                <label key={index} className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200">
                                  <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedInterests.includes(interest)}
                                    onChange={(e) => handleInterestChange(e, interest)} // Pass both the event and the interest
                                  />
                                  <span className="text-black">{truncateText(interest)}</span>
                                </label>
                              ))}
                              <button type="button" className="text-blue-700 block w-full text-left px-4 py-2 text-sm" onClick={toggleModal}>
                                See all...
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                    {/* Instert button here */}
                    {/* Gender filter selection drop-down */}
                    <div className="inline-block text-left">
                      <div className="relative inline-block text-left ">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-[120px] sm:w-auto rounded-md border border-gray-300 shadow-sm px-2 py-2 sm:px-4 sm:py-2 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setIsDropdownGenderOpen(!isDropdownGenderOpen)}
                        >
                          <span className="block lg:hidden">Gender</span>
                          <span className="hidden lg:block">Filter by Gender {filterGender ? `: ${filterGender}` : ''}</span>
                          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>

                        {isDropdownGenderOpen && (
                          <div className="z-10 origin-top-right absolute right-0 mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <button className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 w-full text-left" onClick={() => handleGenderChange(null)}>All</button>
                              <button className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 w-full text-left" onClick={() => handleGenderChange('Male')}>Male</button>
                              <button className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 w-full text-left" onClick={() => handleGenderChange('Female')}>Female</button>
                              <button className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 w-full text-left" onClick={() => handleGenderChange('Other')}>Other</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pop-up window when selecting profile to view more details */}
              {isProfileModalOpen && selectedProfile && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 px-4 py-6 sm:px-6 sm:py-4 fadeInScaleUp backdrop-brightness-90  backdrop-blur-md">
                  <div className="bg-white p-4 sm:p-2 rounded-lg sm:w-[300px] md:w-[500px] lg:w-[700px] xl:w-[900px] w-full space-y-4 overflow-y-auto relative" style={{ maxHeight: "90vh" }}>
                    {/* Container for both images */}
                    <div className="relative mb-4">
                      {/* Background Image */}
                      {selectedProfile.backgroundImageUrl && (
                        <div className="w-full h-[200px] sm:h-[250px] lg:h-[350px] overflow-hidden object-contain rounded-lg ">
                          <Image
                            // NOTE: the width and heigh property are used for remote image URLS.
                            // If your image is imported locally, NextJS determines the width and height automatically 
                            // width={250}
                            // height={150} 
                            fill
                            sizes="100vw"
                            src={selectedProfile.backgroundImageUrl}
                            alt="Background"
                            className="object-cover rounded-sm" />
                        </div>
                      )}
                      {/* Profile Image in Circle */}
                      <div className="absolute bottom-0 transform translate-y-1/2 translate-x-1/2 h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          fill
                          src={selectedProfile.imageUrl}
                          alt="Profile"
                          className="object-cover w-full h-full rounded-full"
                          key={selectedProfile.imageUrl}
                        />
                      </div>
                    </div>

                    <div className='pt-12'>
                      {/* Email and Role */}
                      <div className="text-sm font-bold backdrop:flex flex-col justify-start">
                        <h2 className="text-2xl text-gray-900 font-light">{selectedProfile.name}</h2>
                        <hr className='max-w-xs border-gray-200' />
                        <p className="text-gray-700"><span className='text-gray-400'>Email: </span>{selectedProfile.email}</p>
                        <p className="text-gray-700"><span className='text-gray-400'>Intern Role: </span>{selectedProfile.role}</p>
                      </div>

                      {/* School Name */}
                      {selectedProfile.school && (
                        <div className='text-sm font-bold'>
                          <p className='text-gray-400'>School:<span className='text-gray-900'>{selectedProfile.school}</span></p>
                        </div>
                      )}
                      {/* Major */}
                      {selectedProfile.major && (
                        <div className='text-sm font-bold'>
                          <p className='text-gray-400'>Major:<span className='text-gray-900'>{selectedProfile.major}</span></p>
                        </div>
                      )}
                    </div>


                    {/* Introduction Section */}
                    {selectedProfile.introduction && (
                      <div>
                        <h3 className="text-xl font-light text-gray-400">About</h3>
                        <hr className='max-w-xs border-gray-200' />
                        <p className="text-black text-sm font-semibold">{selectedProfile.introduction}</p>
                      </div>
                    )}

                    {/* Interests Section */}
                    <div>
                      <h3 className="text-xl font-light text-gray-400">Interests</h3>
                      <hr className='max-w-xs border-gray-200' />
                      <ul>
                        {selectedProfile.interests
                          .filter(interest => interest !== "Male" && interest !== "Female")
                          .map((filteredInterest, index) => (
                            <li key={index} className="text-black text-sm font-semibold list-disc ml-5">
                              {filteredInterest}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <button onClick={toggleProfileModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}



              {/* Pop-up window when selecting to view all interest categories for filtering */}
              {isModalOpen && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
                  <div className="bg-white p-5 rounded-lg w-auto min-w-[50%]">
                    <h2 className="text-2xl font-light mb-4 text-gray-600">Filter profiles to match: Interest</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {interestsOptions.map(interest => (
                        <label key={interest} className="inline-flex items-center mt-3 mx-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                            value={interest}
                            onChange={(e) => handleInterestChange(e, interest)} // Correctly use an anonymous function to pass both arguments
                            checked={selectedInterests.includes(interest)}
                          />
                          <span className="text-black">{interest}</span>
                        </label>
                      ))}
                    </div>
                    <button onClick={toggleModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150 ease-in-out">
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Profile Cards */}
              <div className="px-4 py-8">
                <ul
                  role="list"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center lg:justify-items-stretch"
                >
                  {filteredProfiles.map((profile, index) => (
                    <li
                      key={index}
                      className="bg-white shadow-lg w-80 h-96 flex flex-col justify-between rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col items-center p-6 space-y-4">
                        {/* Profile Image */}
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                          <Image
                            src={profile.imageUrl}
                            alt={`${profile.name}'s profile`}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-110 transition-transform duration-300"
                            onClick={() => handleProfileClick(profile)}
                          />
                        </div>

                        {/* Profile Details */}
                        <div className="text-center space-y-2">
                          <h3 className="text-lg font-semibold text-gray-800">{profile.name}</h3>
                          <p className="text-gray-600 text-sm">{profile.email}</p>
                          <p className="text-sm text-gray-700">
                            Role: <span className="font-medium">{profile.role}</span>
                          </p>

                          {/* Roomie Ready Status */}
                          <p
                            className={`text-sm font-medium ${profile.isOnline ? 'text-purple-600' : 'text-gray-300'
                              }`}
                          >
                            {profile.isOnline ? 'Roomie Ready' : 'Not Roomie Ready'}
                          </p>
                        </div>
                      </div>

                      {/* Actions Section */}
                      <div className="flex border-t border-gray-200">
                        <a
                          href={`mailto:${profile.email}`}
                          className="flex-1 py-7 text-center text-indigo-600 font-medium hover:bg-indigo-50 transition duration-300 text-sm"
                        >
                          Email
                        </a>
                        <div className="border-l border-gray-200"></div>
                        <button
                          onClick={() => alert(`Messaging ${profile.name}`)} // Replace with your messaging logic
                          className="flex-1 py-3 text-center text-indigo-600 font-medium hover:bg-indigo-50 transition duration-300 text-sm"
                        >
                          Message
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>







            </div>
            <SocialRightSideComp onSearchChange={handleSearchChange} />

          </div>

        </div>
        <SocialBottomBarComp onSearchChange={handleSearchChange} />
      </div>


    </NotificationProvider>
  );


};

export default Profiles;







