import { ReactNode, useEffect, useRef, useState } from "react";
import { UserType } from "../hooks";
import { useNavigate } from "react-router-dom";

const Dropdown = ({
  user,
  children,
}: {
  user: UserType;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div onClick={toggleDropdown}>{children}</div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
        >
          <li className="block px-4 py-2 text-sm text-gray-700 border-b">
            <div>{user.name}</div>
            <div className="font-semibold">{user.username}</div>
          </li>
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <li>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Settings
              </div>
            </li>
            <li>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  localStorage.removeItem("userDetails");
                  navigate("/signup");
                }}
              >
                Logout
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
